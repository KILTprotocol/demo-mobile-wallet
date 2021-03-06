import {
  Identity,
  PublicIdentity,
  IPublicIdentity,
  RequestForAttestation,
  Message,
  Attestation,
} from '@kiltprotocol/sdk-js'
import {
  SET_IDENTITY,
  RESET_IDENTITY,
  ADD_CLAIM,
  DELETE_ALL_CLAIMS,
  UPDATE_CLAIM_STATUS,
  RESET_PUBLIC_IDENTITY,
  SET_PUBLIC_IDENTITY,
  ADD_CONTACT,
  DELETE_CONTACT,
  DELETE_ALL_CONTACTS,
  UPDATE_BALANCE,
  RESET_BALANCE,
  SET_USERNAME,
  RESET_USERNAME,
  RESET_LAST_VISITED_ROUTE,
  UPDATE_LAST_VISITED_ROUTE,
  UPDATE_CLAIM,
  ADD_OLD_MESSAGE,
} from './redux/actionTypes'
import { ClaimStatus } from './enums'

/* ---------------------------------- */
/*               Claims               */
/* ---------------------------------- */

// ⚠️ This is NOT an SDK-like Claim type. TClaim is a hybrid of Claim and AttestedClaim: it's a claim that has a status.
export type TClaim = {
  title: string
  contents: object
  hash: string
  status: ClaimStatus
  requestTimestamp: number
  req4Att: RequestForAttestation
  attestation?: Attestation
}

export type THashAndClaimStatus = {
  status: ClaimStatus
  hash: string
}

export type THashAndClaimStatusAndData = {
  status: ClaimStatus
  hash: string
  req4Att?: RequestForAttestation
  attestation?: Attestation
}

export type TClaimContents = object

export type TClaimMapByHash = { [key: string]: TClaim }

/* ---------------------------------- */
/*              Contacts              */
/* ---------------------------------- */

export type TContact = {
  publicIdentity: IPublicIdentity
  name: string
}

/* ---------------------------------- */
/*              Messages              */
/* ---------------------------------- */

export interface IMessageMapById {
  [messageId: string]: boolean
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

type TAddClaimAction = {
  type: typeof ADD_CLAIM
  payload: TClaim
}

type TDeleteAllClaimsAction = {
  type: typeof DELETE_ALL_CLAIMS
}

type TUpdateClaimStatusAction = {
  type: typeof UPDATE_CLAIM_STATUS
  payload: THashAndClaimStatus
}

type TUpdateClaimAction = {
  type: typeof UPDATE_CLAIM
  payload: THashAndClaimStatusAndData
}

type TAddContactAction = {
  type: typeof ADD_CONTACT
  payload: TContact
}

type TDeleteContactAction = {
  type: typeof DELETE_CONTACT
  payload: PublicIdentity['address']
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

type TAddOldMessageAction = {
  type: typeof ADD_OLD_MESSAGE
  payload: Message['messageId']
}

export type TAppAction =
  | TSetIdentityAction
  | TResetIdentityAction
  | TSetPublicIdentityAction
  | TResetPublicIdentityAction
  | TAddClaimAction
  | TDeleteAllClaimsAction
  | TUpdateClaimStatusAction
  | TUpdateClaimAction
  | TAddContactAction
  | TDeleteContactAction
  | TDeleteAllContactsAction
  | TUpdateBalanceAction
  | TResetBalanceAction
  | TSetUsernameAction
  | TResetUsernameAction
  | TResetUsernameAction
  | TUpdateLastVisitedRouteAction
  | TResetLastVisitedRouteAction
  | TAddOldMessageAction

/* ---------------------------------- */
/*      Redux: State and Dispatch     */
/* ---------------------------------- */

export type TMapDispatchToProps = {
  addClaimInStore: (claim: TClaim) => void
  updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => void
  updateClaimInStore: (hashAndStatusAndData: THashAndClaimStatusAndData) => void
  resetIdentityInStore: () => void
  setIdentityInStore: (identity: Identity) => void
  setPublicIdentityInStore: (publicIdentity: PublicIdentity) => void
  resetPublicIdentityInStore: () => void
  deleteAllClaimsInStore: () => void
  addContactInStore: (contact: TContact) => void
  deleteContactInStore: (address: PublicIdentity['address']) => void
  deleteAllContactsInStore: () => void
  updateBalanceInStore: (balance: number) => void
  resetBalanceInStore: () => void
  setUsernameInStore: (username: string) => void
  updateLastVisitedRouteInStore: (route: string) => void
  addOldMessageInStore: (messageId: Message['messageId']) => void
}

export type TMapStateToProps = {
  balanceFromStore: number
  contactsFromStore: TContact[]
  identityFromStore: Identity
  publicIdentityFromStore: PublicIdentity
  claimsMapFromStore: TClaimMapByHash
  usernameFromStore: string
  lastVisitedRouteFromStore: string
  oldMessagesFromStore: IMessageMapById
}
