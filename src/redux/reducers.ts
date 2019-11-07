import { combineReducers } from 'redux'
import identityReducer from './identityReducer'
import credentialsReducer from './credentialsReducer'

const rootReducer = combineReducers({
  identityReducer: identityReducer,
  credentialsReducer: credentialsReducer,
})

// TODO define TAppState type, so far issue with combineReducers that nests the ppties
export type TAppState = any

export default rootReducer
