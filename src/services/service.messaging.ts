import {
  IMessage,
  IEncryptedMessage,
  Message,
  Identity,
  IDid,
  PublicIdentity,
  MessageBody,
} from '@kiltprotocol/sdk-js'
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

// As in prototype/services

export interface IContact {
  metaData: {
    name: string
    addedAt?: number
    addedBy?: IMyIdentity['identity']['address']
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
    console.log(
      'sending to',
      serviceAddress || CONFIG_CONNECT.MESSAGING_SERVICE_URL_FALLBACK
    )
    return fetch(
      `${serviceAddress || CONFIG_CONNECT.MESSAGING_SERVICE_URL_FALLBACK}`,
      {
        ...BasePostParams,
        body: JSON.stringify(message.getEncryptedMessage()),
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
    metaData: {
      name: '',
    },
    publicIdentity: attesterPublicIdentity,
  }
  await singleSend(
    {
      content: requestForAttestation,
      type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
    },
    sender,
    receiver,
    attesterPublicIdentity.serviceAddress
  )
}
