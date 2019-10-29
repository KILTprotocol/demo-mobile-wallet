import { RESET_IDENTITY, SET_IDENTITY } from './actionTypes'
import { AppState } from './reducers'

const identityDefault = null

const INITIAL_STATE = {
  identity: identityDefault,
}

type Action = {
  payload: any
  type: string
}

export default function identityReducer(
  state = INITIAL_STATE,
  action: Action
): AppState {
  switch (action.type) {
    case SET_IDENTITY:
      return {
        ...state,
        identity: action.payload,
      }
    case RESET_IDENTITY:
      return {
        ...state,
        identity: identityDefault,
      }
    default:
      return state
  }
}
