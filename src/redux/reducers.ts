import { combineReducers } from 'redux'
import balanceReducer from './balanceReducer'
import credentialsReducer from './credentialsReducer'
import contactsReducer from './contactsReducer'
import identityReducer from './identityReducer'
import publicIdentityReducer from './publicIdentityReducer'
import usernameReducer from './usernameReducer'

const rootReducer = combineReducers({
  identityReducer: identityReducer,
  publicIdentityReducer: publicIdentityReducer,
  credentialsReducer: credentialsReducer,
  contactsReducer: contactsReducer,
  balanceReducer: balanceReducer,
  usernameReducer: usernameReducer,
})

// TODO define TAppState type, so far issue with combineReducers that nests the ppties
export type TAppState = any

export default rootReducer
