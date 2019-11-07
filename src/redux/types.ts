import { Identity } from '@kiltprotocol/sdk-js'
import {
  SET_IDENTITY,
  RESET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
} from './actionTypes'
import { CredentialStatus } from '../_enums'

// Actions

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

type TUpdateCredentialStatusAction = {
  type: typeof UPDATE_CREDENTIAL_STATUS
  // payload = status and hash
  payload: THashAndClaimStatus
}

export type TAppAction =
  | TSetIdentityAction
  | TResetIdentityAction
  | TAddCredentialAction
  | TDeleteAllCredentialsAction
  | TUpdateCredentialStatusAction

// Others

export type TCredential = {
  title: string
  contents: object
  hash: string
  cTypeHash: string
  status: CredentialStatus
}

export type THashAndClaimStatus = {
  status: CredentialStatus
  hash: string
}

// TODO move all types into separate files??
