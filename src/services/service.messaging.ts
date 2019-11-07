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

/**
 * as in prototype/services
 */
// TODO: are IContact and IMyIdentity needed?
export interface IContact {
  metaData: {
    name: string
    addedAt?: number // timestamp
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

/**
 * local Identity
 */
export interface IMyIdentity {
  identity: Identity
  metaData: {
    name: string
  }
  phrase: string
  did?: IDid['identifier']
  createdAt?: number
}

// TODO class for namespacing vs.
class MessageService {
  public static async singleSend(
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
          console.log('Message sent')
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
      return Promise.reject()
    }
  }
}

export default MessageService
