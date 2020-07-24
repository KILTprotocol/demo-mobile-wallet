import { RESET_USERNAME, SET_USERNAME } from './actionTypes'
import { TAppAction } from '../types'
import { TAppState } from './reducers'

const usernameDefault = 'MOBILE_WALLET_CLAIMER'

const INITIAL_STATE = {
  usernameReducer: usernameDefault,
}

export default function usernameReducer(
  state = INITIAL_STATE,
  action: TAppAction,
): TAppState {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload.trimLeft().trimRight()
          ? action.payload.trimLeft().trimRight()
          : usernameDefault,
      }
    case RESET_USERNAME:
      return {
        ...state,
        username: usernameDefault,
      }
    default:
      return state
  }
}
