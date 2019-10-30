import { ADD_CREDENTIAL, DELETE_ALL_CREDENTIALS } from './actionTypes'
import { Action } from './actionsTSTypes'
import { AppState } from './reducers'
import { CredentialStatus } from '../_enums'

export type CredentialType = {
  title: string
  contents: object
  hash: string
  cTypeHash: string
  status: CredentialStatus
}
// TODO clean anys

const credentialsDefault: CredentialType[] = []

const INITIAL_STATE = {
  credentials: credentialsDefault,
}

export default function credentialsReducer(
  state = INITIAL_STATE,
  action: Action
): AppState {
  switch (action.type) {
    case ADD_CREDENTIAL:
      return {
        ...state,
        credentials: [...state.credentials, action.payload],
      }
    case DELETE_ALL_CREDENTIALS:
      return {
        ...state,
        credentials: [],
      }
    default:
      return state
  }
}
