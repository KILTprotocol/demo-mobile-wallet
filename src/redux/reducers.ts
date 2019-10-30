import { combineReducers } from 'redux'
import identityReducer from './identityReducer'
import credentialsReducer from './credentialsReducer'

const rootReducer = combineReducers({
  identityReducer: identityReducer,
  credentialsReducer: credentialsReducer,
})

// TODO define AppState type, so far issue with combineReducers that nests the ppties
export type AppState = any

export default rootReducer
