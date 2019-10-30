import { Identity } from '@kiltprotocol/sdk-js'
import {
  SET_IDENTITY,
  RESET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
} from './actionTypes'
import { CredentialType } from './credentialsReducer'

type SetIdentityAction = {
  type: typeof SET_IDENTITY
  payload: Identity | null
}

type ResetIdentityAction = {
  type: typeof RESET_IDENTITY
}

type AddCredentialAction = {
  type: typeof ADD_CREDENTIAL
  payload: CredentialType
}

type DeleteAllCredentialsAction = {
  type: typeof DELETE_ALL_CREDENTIALS
  payload: CredentialType
}

export type AppActionTSTypes =
  | SetIdentityAction
  | ResetIdentityAction
  | AddCredentialAction
  | DeleteAllCredentialsAction

export type Action = {
  payload: any
  type: string
}

// TODO move all types into separate files??
