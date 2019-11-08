import { combineReducers } from 'redux'
import identityReducer from './identityReducer'
import publicIdentityReducer from './publicIdentityReducer'
import credentialsReducer from './credentialsReducer'

const rootReducer = combineReducers({
  identityReducer: identityReducer,
  publicIdentityReducer: publicIdentityReducer,
  credentialsReducer: credentialsReducer,
})

// TODO define TAppState type, so far issue with combineReducers that nests the ppties
export type TAppState = any

export default rootReducer
