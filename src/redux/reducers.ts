import { Identity } from '@kiltprotocol/sdk-js'
import { SET_IDENTITY } from './actionTypes'

const INITIAL_STATE = {
  identity: null,
}

type Action = {
  payload: any
  type: string
}

export type AppState = {
  identity: Identity | null
}

export default function reducer(
  state = INITIAL_STATE,
  action: Action
): AppState {
  switch (action.type) {
    case SET_IDENTITY:
      return {
        ...state,
        identity: action.payload,
      }
    default:
      return state
  }
}
