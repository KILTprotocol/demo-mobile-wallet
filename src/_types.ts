import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import {
  SET_IDENTITY,
  RESET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
  RESET_PUBLIC_IDENTITY,
  SET_PUBLIC_IDENTITY,
  ADD_CONTACT,
  DELETE_ALL_CONTACTS,
} from './redux/actionTypes'
import { CredentialStatus } from './_enums'

/* ---------------------------------- */
/*         Claims, Credentials        */
/* ---------------------------------- */

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

/* ---------------------------------- */
/*              Contacts              */
/* ---------------------------------- */

export type TContact = {
  address: string
  name: string
}

/* ---------------------------------- */
/*           Redux: Actions           */
/* ---------------------------------- */

type TSetIdentityAction = {
  type: typeof SET_IDENTITY
  payload: Identity | null
}

type TResetIdentityAction = {
  type: typeof RESET_IDENTITY
}

type TSetPublicIdentityAction = {
  type: typeof SET_PUBLIC_IDENTITY
  payload: PublicIdentity | null
}

type TResetPublicIdentityAction = {
  type: typeof RESET_PUBLIC_IDENTITY
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

// todo harmonize add conbtact vs create contact naming
type TAddContactAction = {
  type: typeof ADD_CONTACT
  payload: TContact
}

type TDeleteAllContactsAction = {
  type: typeof DELETE_ALL_CONTACTS
}

export type TAppAction =
  | TSetIdentityAction
  | TResetIdentityAction
  | TSetPublicIdentityAction
  | TResetPublicIdentityAction
  | TAddCredentialAction
  | TDeleteAllCredentialsAction
  | TUpdateCredentialStatusAction
  | TAddContactAction
  | TDeleteAllContactsAction

/* ---------------------------------- */
/*      Redux: State and Dispatch     */
/* ---------------------------------- */

export type TMapDispatchToProps = {
  addCredentialInStore: (credential: TCredential) => void
  updateCredentialStatusInStore: (hashAndStatus: THashAndClaimStatus) => void
  resetIdentityInStore: () => void
  setIdentityInStore: (identity: Identity) => void
  setPublicIdentityInStore: (publicIdentity: PublicIdentity) => void
  resetPublicIdentityInStore: () => void
  deleteAllCredentialsInStore: (hashAndStatus: THashAndClaimStatus) => void
  addContactInStore: (contact: TContact) => void
  deleteAllContactsInStore: () => void
}

export type TMapStateToProps = {
  identityFromStore: Identity
  publicIdentityFromStore: PublicIdentity
  credentialsMapFromStore: TCredentialMapByHash
}
