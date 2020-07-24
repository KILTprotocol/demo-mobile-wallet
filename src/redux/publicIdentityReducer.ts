import { SET_PUBLIC_IDENTITY, RESET_PUBLIC_IDENTITY } from './actionTypes'
import { TAppAction } from '../types'
import { TAppState } from './reducers'

const publicIdentityDefault = null

const INITIAL_STATE = {
  publicIdentity: publicIdentityDefault,
}

export default function publicIdentityReducer(
  state = INITIAL_STATE,
  action: TAppAction,
): TAppState {
  switch (action.type) {
    case SET_PUBLIC_IDENTITY:
      return {
        ...state,
        publicIdentity: action.payload,
      }
    case RESET_PUBLIC_IDENTITY:
      return {
        ...state,
        publicIdentity: publicIdentityDefault,
      }
    default:
      return state
  }
}
