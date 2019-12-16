import { Identity, PublicIdentity, IPublicIdentity } from '@kiltprotocol/sdk-js'
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
  UPDATE_BALANCE,
  RESET_BALANCE,
  SET_USERNAME,
  RESET_USERNAME,
  RESET_LAST_VISITED_ROUTE,
  UPDATE_LAST_VISITED_ROUTE,
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
  requestTimestamp: number
}

export type THashAndClaimStatus = {
  status: CredentialStatus
  hash: string
}

export type TClaimContents = {
  name: string
  birthday: number
  type: string
}

export type TCredentialMapByHash = { [key: string]: TCredential }

/* ---------------------------------- */
/*              Contacts              */
/* ---------------------------------- */

export type TContact = {
  address: IPublicIdentity['address']
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

type TAddContactAction = {
  type: typeof ADD_CONTACT
  payload: TContact
}

type TUpdateBalanceAction = {
  type: typeof UPDATE_BALANCE
  payload: number
}

type TResetBalanceAction = {
  type: typeof RESET_BALANCE
}

type TDeleteAllContactsAction = {
  type: typeof DELETE_ALL_CONTACTS
}

type TSetUsernameAction = {
  type: typeof SET_USERNAME
  payload: string
}

type TResetUsernameAction = {
  type: typeof RESET_USERNAME
}

type TUpdateLastVisitedRouteAction = {
  type: typeof UPDATE_LAST_VISITED_ROUTE
  payload: string
}

type TResetLastVisitedRouteAction = {
  type: typeof RESET_LAST_VISITED_ROUTE
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
  | TUpdateBalanceAction
  | TResetBalanceAction
  | TSetUsernameAction
  | TResetUsernameAction
  | TResetUsernameAction
  | TUpdateLastVisitedRouteAction
  | TResetLastVisitedRouteAction

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
  deleteAllCredentialsInStore: () => void
  addContactInStore: (contact: TContact) => void
  deleteAllContactsInStore: () => void
  updateBalanceInStore: (balance: number) => void
  resetBalanceInStore: () => void
  setUsernameInStore: (username: string) => void
  updateLastVisitedRouteInStore: (route: string) => void
}

export type TMapStateToProps = {
  balanceFromStore: number
  identityFromStore: Identity
  publicIdentityFromStore: PublicIdentity
  credentialsMapFromStore: TCredentialMapByHash
  usernameFromStore: string
  lastVisitedRouteFromStore: string
}
