import { Identity, PublicIdentity, Message } from '@kiltprotocol/sdk-js'
import {
  RESET_IDENTITY,
  SET_IDENTITY,
  ADD_CLAIM,
  DELETE_ALL_CLAIMS,
  UPDATE_CLAIM_STATUS,
  SET_PUBLIC_IDENTITY,
  RESET_PUBLIC_IDENTITY,
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
} from './actionTypes'
import {
  TAppAction,
  TClaim,
  THashAndClaimStatus,
  TContact,
  THashAndClaimStatusAndData,
} from '../types'

/* ---------------------------------- */
/*              Identity              */
/* ---------------------------------- */

export const setIdentity = (identity: Identity | null): TAppAction => ({
  type: SET_IDENTITY,
  payload: identity,
})

export const resetIdentity = (): TAppAction => ({
  type: RESET_IDENTITY,
})

export const setPublicIdentity = (
  publicIdentity: PublicIdentity | null
): TAppAction => ({
  type: SET_PUBLIC_IDENTITY,
  payload: publicIdentity,
})

export const resetPublicIdentity = (): TAppAction => ({
  type: RESET_PUBLIC_IDENTITY,
})

/* ---------------------------------- */
/*             Claims                 */
/* ---------------------------------- */

export const addClaim = (claim: TClaim): TAppAction => ({
  type: ADD_CLAIM,
  payload: claim,
})

export const updateClaimStatus = (
  hashAndStatus: THashAndClaimStatus
): TAppAction => ({
  type: UPDATE_CLAIM_STATUS,
  payload: hashAndStatus,
})

export const updateClaim = (
  hashAndStatusAndData: THashAndClaimStatusAndData
): TAppAction => ({
  type: UPDATE_CLAIM,
  payload: hashAndStatusAndData,
})

export const deleteAllClaims = (): TAppAction => ({
  type: DELETE_ALL_CLAIMS,
})

/* ---------------------------------- */
/*              Contacts              */
/* ---------------------------------- */

export const addContact = (contact: TContact): TAppAction => ({
  type: ADD_CONTACT,
  payload: contact,
})

export const deleteContact = (
  address: PublicIdentity['address']
): TAppAction => ({
  type: DELETE_CONTACT,
  payload: address,
})

export const deleteAllContacts = (): TAppAction => ({
  type: DELETE_ALL_CONTACTS,
})

/* ---------------------------------- */
/*              Balance               */
/* ---------------------------------- */

export const updateBalance = (balance: number): TAppAction => ({
  type: UPDATE_BALANCE,
  payload: balance,
})

export const resetBalance = (): TAppAction => ({
  type: RESET_BALANCE,
})

/* ---------------------------------- */
/*              Username              */
/* ---------------------------------- */

export const setUsername = (username: string): TAppAction => ({
  type: SET_USERNAME,
  payload: username,
})

export const resetUsername = (): TAppAction => ({
  type: RESET_USERNAME,
})

/* ---------------------------------- */
/*              Route/Nav             */
/* ---------------------------------- */

export const updateLastVisitedRoute = (
  lastVisitedRoute: string
): TAppAction => ({
  type: UPDATE_LAST_VISITED_ROUTE,
  payload: lastVisitedRoute,
})

export const resetLastVisitedRoute = (): TAppAction => ({
  type: RESET_LAST_VISITED_ROUTE,
})

/* ---------------------------------- */
/*            Old messages            */
/* ---------------------------------- */

export const addOldMessage = (messageId: Message['messageId']): TAppAction => ({
  type: ADD_OLD_MESSAGE,
  payload: messageId,
})
