import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import {
  RESET_IDENTITY,
  SET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
  SET_PUBLIC_IDENTITY,
  RESET_PUBLIC_IDENTITY,
  ADD_CONTACT,
  DELETE_ALL_CONTACTS,
  UPDATE_BALANCE,
  RESET_BALANCE,
} from './actionTypes'
import {
  TAppAction,
  TCredential,
  THashAndClaimStatus,
  TContact,
} from '../_types'

/* ---------------------------------- */
/*              Identity              */
/* ---------------------------------- */
export const setIdentity = (identity: Identity | null): TAppAction => ({
  type: SET_IDENTITY,
  payload: identity,
})

// TODO rename credentials vs claims
// todo rename reset identity to delete in store
// todo harmonize create vs add in dialog names, action names, reducers, color names, etc
// todo rename mnemonic dialog
// todo rename InStore to InRdxStore

// todo fix folder structure

// todo draw flow and architecture

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
/*             Credentials            */
/* ---------------------------------- */

export const addCredential = (credential: TCredential): TAppAction => ({
  type: ADD_CREDENTIAL,
  payload: credential,
})

export const updateCredentialStatus = (
  statusAndHash: THashAndClaimStatus
): TAppAction => ({
  type: UPDATE_CREDENTIAL_STATUS,
  payload: statusAndHash,
})

export const deleteAllCredentials = (): TAppAction => ({
  type: DELETE_ALL_CREDENTIALS,
})

/* ---------------------------------- */
/*              Contacts              */
/* ---------------------------------- */

export const addContact = (contact: TContact): TAppAction => ({
  type: ADD_CONTACT,
  payload: contact,
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
