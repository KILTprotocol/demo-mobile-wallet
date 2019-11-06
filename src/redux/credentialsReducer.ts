import { TAction } from './actionsTSTypes'
import { TAppState } from './reducers'
import { CredentialStatus } from '../_enums'

export type TCredential = {
  title: string
  contents: object
  hash: string
  cTypeHash: NonceHash
  status: CredentialStatus
}
// TODO clean anys

const credentialsDefault: TCredential[] = []

const INITIAL_STATE = {
  credentials: credentialsDefault,
}

export default function credentialsReducer(
  state = INITIAL_STATE,
  action: TAction
): TAppState {
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
