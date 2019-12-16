import {
  IMessage,
  IEncryptedMessage,
  Message,
  Identity,
  IDid,
  PublicIdentity,
  MessageBody,
} from '@kiltprotocol/sdk-js'
import { MESSAGING_SERVICE_URL } from '../_config'

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
  receiver: IContact
): Promise<any> {
  try {
    const message: Message = new Message(
      messageBody,
      sender.identity,
      receiver.publicIdentity
    )
    return fetch(`${MESSAGING_SERVICE_URL}`, {
      ...BasePostParams,
      body: JSON.stringify(message.getEncryptedMessage()),
    })
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
        console.info(error)
      })
  } catch (error) {
    console.info(error)
    return Promise.reject()
  }
}
