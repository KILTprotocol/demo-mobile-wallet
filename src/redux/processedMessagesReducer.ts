import { Message } from '@kiltprotocol/sdk-js'
import { ADD_PROCESSED_MESSAGE } from './actionTypes'
import { TAppAction } from '../types'
import { TAppState } from './reducers'

// redux-persist-state unfortunately does not support ES6 Sets, so we fallback to an object
const INITIAL_STATE = {
  processedMessages: {},
}

export default function processedMessagesReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case ADD_PROCESSED_MESSAGE:
      return {
        ...state,
        processedMessages: {
          ...state.processedMessages,
          // redux-persist-state unfortunately does not support ES6 Sets, so we fallback to an object
          [`${action.payload}`]: true,
        },
      }
    default:
      return state
  }
}
