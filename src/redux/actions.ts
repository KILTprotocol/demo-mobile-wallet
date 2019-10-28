import { Identity } from '@kiltprotocol/sdk-js'
import { SET_IDENTITY } from './actionTypes'
import { AppActionTSTypes } from './actionsTSTypes'

export const setIdentity = (identity: Identity | null): AppActionTSTypes => ({
  type: SET_IDENTITY,
  payload: identity,
})
