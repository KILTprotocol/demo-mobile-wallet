import {
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
} from './actionTypes'
import { TAppAction } from './types'
import { TAppState } from './reducers'

// TODO clean any

const INITIAL_STATE = {
  // TODO set up real type
  credentialsAsObject: {},
}

// TODO change name of credential, since a credential is only when attested
export default function credentialsReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case ADD_CREDENTIAL:
      return {
        ...state,
        credentialsAsObject: {
          ...state.credentialsAsObject,
          [action.payload.hash]: action.payload,
        },
      }
    case DELETE_ALL_CREDENTIALS:
      return {
        ...state,
        credentialsAsObject: {},
      }
    case UPDATE_CREDENTIAL_STATUS:
      console.log('updating credential status', action.payload.hash)
      // TODO fix
      if (state.credentialsAsObject[action.payload.hash]) {
        const newState = {
          ...state,
          credentialsAsObject: {
            ...state.credentialsAsObject,
            [action.payload.hash]: {
              ...state.credentialsAsObject[action.payload.hash],
              status: action.payload.status,
            },
          },
        }
        console.log('========))))))', newState.credentialsAsObject)
        return newState
      }
      return state

    default:
      return state
  }
}
