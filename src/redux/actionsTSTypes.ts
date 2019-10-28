import { SET_IDENTITY } from './actionTypes'
import { Identity } from '@kiltprotocol/sdk-js'

type SetIdentityAction = {
  type: typeof SET_IDENTITY
  payload: Identity
}

export type AppActionTSTypes = SetIdentityAction
