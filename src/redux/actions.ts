import { Identity } from '@kiltprotocol/sdk-js'
import {
  RESET_IDENTITY,
  SET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
} from './actionTypes'
import { TAppAction } from './actionsTSTypes'
import { TCredential } from './credentialsReducer'

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

export const deleteAllCredentials = (): AppActionTSTypes => ({
  type: DELETE_ALL_CREDENTIALS,
})
