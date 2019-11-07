import { Identity } from '@kiltprotocol/sdk-js'
import {
  SET_IDENTITY,
  RESET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
} from './redux/actionTypes'
import { CredentialStatus } from './_enums'

// ---------------------
// Claims, Credentials
// ---------------------

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

export type TDriversLicenseClaimContents = {
  name: string
  birthday: number
  type: string
}

export type TCredentialMapByHash = { [key: string]: TCredential }

export type TMapStateToProps = {
  identityFromStore: Identity
  credentialsAsObjectFromStore: TCredentialMapByHash
}

// ---------------------
// Redux: Actions
// ---------------------

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

// ---------------------
// Redux: State and Dispatch mapping
// ---------------------

export type TMapDispatchToProps = {
  addCredentialInStore: (credential: TCredential) => void
  updateCredentialStatusInStore: (hashAndStatus: THashAndClaimStatus) => void
  resetIdentityInStore: () => void
  setIdentityInStore: (identity: Identity) => void
  deleteAllCredentialsInStore: (hashAndStatus: THashAndClaimStatus) => void
}
