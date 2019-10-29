import { Identity } from '@kiltprotocol/sdk-js'
import { RESET_IDENTITY, SET_IDENTITY } from './actionTypes'
import { AppActionTSTypes } from './actionsTSTypes'

export const setIdentity = (identity: Identity | null): AppActionTSTypes => ({
  type: SET_IDENTITY,
  payload: identity,
})

export const resetIdentity = (): AppActionTSTypes => ({
  type: RESET_IDENTITY,
})
