import { Identity } from '@kiltprotocol/sdk-js'
import {
  SET_IDENTITY,
  RESET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
} from './actionTypes'
import { TCredential } from './credentialsReducer'

type TSetIdentityAction = {
  type: typeof SET_IDENTITY
  payload: Identity | null
}

type TResetIdentityAction = {
  type: typeof RESET_IDENTITY
}

type TAddCredentialAction = {
  type: typeof ADD_CREDENTIAL
  payload: TCredential
}

type TDeleteAllCredentialsAction = {
  type: typeof DELETE_ALL_CREDENTIALS
}
}

export type TAppAction =
  | TSetIdentityAction
  | TResetIdentityAction
  | TAddCredentialAction
  | TDeleteAllCredentialsAction

export type TAction = {
  payload: any
  type: string
}

// TODO move all types into separate files??
