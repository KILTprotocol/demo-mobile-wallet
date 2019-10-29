import { Identity } from '@kiltprotocol/sdk-js'
import { combineReducers } from 'redux'
import identityReducer from './identityReducer'

const rootReducer = combineReducers({
  identityReducer: identityReducer,
})

export type AppState = {
  identity: Identity | null
}

export default rootReducer
