import { combineReducers } from 'redux'
import identityReducer from './identityReducer'
import publicIdentityReducer from './publicIdentityReducer'
import credentialsReducer from './credentialsReducer'
import contactsReducer from './contactsReducer'

const rootReducer = combineReducers({
  identityReducer: identityReducer,
  publicIdentityReducer: publicIdentityReducer,
  credentialsReducer: credentialsReducer,
  contactsReducer: contactsReducer,
})

// TODO define TAppState type, so far issue with combineReducers that nests the ppties
export type TAppState = any

export default rootReducer
