import { ADD_OLD_MESSAGE } from './actionTypes'
import { TAppAction } from '../types'
import { TAppState } from './reducers'

// redux-persist-state unfortunately does not support ES6 Sets, so we fallback to an object
const INITIAL_STATE = {
  oldMessages: {},
}

export default function oldMessagesReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case ADD_OLD_MESSAGE:
      return {
        ...state,
        oldMessages: {
          ...state.oldMessages,
          // redux-persist-state unfortunately does not support ES6 Sets, so we fallback to an object
          [`${action.payload}`]: true,
        },
      }
    default:
      return state
  }
}
