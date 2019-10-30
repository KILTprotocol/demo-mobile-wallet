import { Identity } from '@kiltprotocol/sdk-js'
import {
  RESET_IDENTITY,
  SET_IDENTITY,
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
} from './actionTypes'
import { AppActionTSTypes } from './actionsTSTypes'
import { CredentialType } from './credentialsReducer'

export const setIdentity = (identity: Identity | null): AppActionTSTypes => ({
  type: SET_IDENTITY,
  payload: identity,
})

export const resetIdentity = (): AppActionTSTypes => ({
  type: RESET_IDENTITY,
})

export const addCredential = (
  credential: CredentialType
): AppActionTSTypes => ({
  type: ADD_CREDENTIAL,
  payload: credential,
})

export const deleteAllCredentials = (): AppActionTSTypes => ({
  type: DELETE_ALL_CREDENTIALS,
})
