import {
  IMessage,
  IEncryptedMessage,
  Message,
  Identity,
  IDid,
  PublicIdentity,
  MessageBody,
  MessageBodyType,
  RequestForAttestation,
  IAttestedClaim,
} from '@kiltprotocol/sdk-js'
import { IMessageMapById } from '../types'
import { CONFIG_CONNECT } from '../config'

export const BaseFetchParams: Partial<RequestInit> = {
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  mode: 'cors',
}

export const BasePostParams: Partial<RequestInit> = {
  ...BaseFetchParams,
  method: 'POST',
}

export const BaseDeleteParams: Partial<RequestInit> = {
  ...BaseFetchParams,
  method: 'DELETE',
}

export interface IMessageOutput extends IMessage {
  encryptedMessage: IEncryptedMessage
  sender?: IContact
}

// like in the prototype-services
export interface IContact {
  metaData: {
    name: string
    addedAt?: number
    addedBy?: string
    unregistered?: boolean
  }
  did?: {
    address?: string
    document?: object
  }
  signature?: string
  publicIdentity: PublicIdentity
}

export interface IMyIdentity {
  identity: Identity
  metaData: {
    name: string
  }
  phrase: string
  did?: IDid['identifier']
  createdAt?: number
}

export async function singleSend(
  messageBody: MessageBody,
  sender: IMyIdentity,
  receiver: IContact,
  serviceAddress?: string
): Promise<any> {
  try {
    const message: Message = new Message(
      messageBody,
      sender.identity,
      receiver.publicIdentity
    )
    return fetch(
      `${serviceAddress || CONFIG_CONNECT.MESSAGING_SERVICE_URL_FALLBACK}`,
      {
        ...BasePostParams,
        body: JSON.stringify(message.encrypt()),
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(() => {
        console.info('[MESSAGE] Message sent')
      })
      .catch(error => {
        console.info('[MESSAGE] Error:', error)
      })
  } catch (error) {
    console.info('[MESSAGE] Error:', error)
    return Promise.reject()
  }
}

function isMessageNew(
  oldMessages: IMessageMapById,
  messageId: Message['messageId']
): boolean {
  return !!messageId && !oldMessages[messageId]
}

export async function fetchAndDecryptNewMessages(
  identity: Identity,
  oldMessages: IMessageMapById
): Promise<IMessage[]> {
  console.info('[MESSAGES] Fetching messages...')
  return fetch(
    `${CONFIG_CONNECT.MESSAGING_SERVICE_URL_FALLBACK}/inbox/${identity.getAddress()}`
  )
    .then(response => response.json())
    .then((encryptedMessages: IEncryptedMessage[]) => {
      const newDecryptedMessages = encryptedMessages
        // for performance reasons, we wouldn't want to decrypt and process all messages this user has ever received; we onbly care about new messages. So we keep in this app track of the old messages (= that have already been processed) by the app
        .filter(message => isMessageNew(oldMessages, message.messageId))
        .map(message =>
          Message.decrypt(
            message,
            identity
          )
        )
      console.info('[MESSAGES] New messages: ', newDecryptedMessages.length)
      newDecryptedMessages.forEach(message => {
        try {
          Message.ensureOwnerIsSender(message)
        } catch (error) {
          console.error(error)
        }
      })
      return newDecryptedMessages
    })
}

export async function fetchAndDecryptNewAttestationMessages(
  identity: Identity,
  oldMessages: IMessageMapById
): Promise<IMessage[]> {
  const messages = await fetchAndDecryptNewMessages(identity, oldMessages)
  return messages.filter(
    message =>
      message.body.type ===
      (MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM ||
        MessageBodyType.REJECT_ATTESTATION_FOR_CLAIM)
  )
}

export async function sendRequestForAttestation(
  requestForAttestation: RequestForAttestation,
  claimerIdentity: Identity,
  attesterPublicIdentity: PublicIdentity
): Promise<void> {
  const sender = {
    identity: claimerIdentity,
    metaData: {
      name: '',
    },
    phrase: '',
  }
  const receiver = {
    publicIdentity: attesterPublicIdentity,
    metaData: {
      name: '',
    },
  }
  await singleSend(
    {
      content: {requestForAttestation},
      type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
    },
    sender,
    receiver,
    attesterPublicIdentity.serviceAddress
  )
}

export async function sendAttestedClaim(
  attestedClaim: IAttestedClaim,
  claimerIdentity: Identity,
  verifierPublicIdentity: PublicIdentity
): Promise<void> {
  const sender = {
    identity: claimerIdentity,
    metaData: {
      name: '',
    },
    phrase: '',
  }
  const receiver = {
    publicIdentity: verifierPublicIdentity,
    metaData: {
      name: '',
    },
  }
  await singleSend(
    {
      content: [attestedClaim],
      type: MessageBodyType.SUBMIT_CLAIMS_FOR_CTYPES_PUBLIC,
    },
    sender,
    receiver,
    verifierPublicIdentity.serviceAddress
  )
}
