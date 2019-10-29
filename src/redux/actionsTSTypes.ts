import { SET_IDENTITY, RESET_IDENTITY } from './actionTypes'
import { Identity } from '@kiltprotocol/sdk-js'

type SetIdentityAction = {
  type: typeof SET_IDENTITY
  payload: Identity | null
}

type ResetIdentityAction = {
  type: typeof RESET_IDENTITY
}

export type AppActionTSTypes = SetIdentityAction | ResetIdentityAction
