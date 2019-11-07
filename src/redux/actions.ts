import { Identity } from '@kiltprotocol/sdk-js'
import {
  RESET_IDENTITY,
  SET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
} from './actionTypes'
import { TAppAction, TCredential, THashAndClaimStatus } from '../_types'

export const setIdentity = (identity: Identity | null): TAppAction => ({
  type: SET_IDENTITY,
  payload: identity,
})

export const resetIdentity = (): TAppAction => ({
  type: RESET_IDENTITY,
})

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
