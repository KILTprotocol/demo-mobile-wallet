import { UPDATE_BALANCE } from './actionTypes'
import { TAppAction } from '../_types'
import { TAppState } from './reducers'

const balanceDefault = 0

const INITIAL_STATE = {
  balance: balanceDefault,
}

export default function balanceReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload,
      }
    default:
      return state
  }
}
