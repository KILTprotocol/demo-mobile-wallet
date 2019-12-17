import { combineReducers } from 'redux'
import balanceReducer from './balanceReducer'
import credentialsReducer from './credentialsReducer'
import contactsReducer from './contactsReducer'
import identityReducer from './identityReducer'
import publicIdentityReducer from './publicIdentityReducer'
import usernameReducer from './usernameReducer'
import lastVisitedRouteReducer from './lastVisitedRouteReducer'

const rootReducer = combineReducers({
  identityReducer,
  publicIdentityReducer,
  credentialsReducer,
  contactsReducer,
  balanceReducer,
  usernameReducer,
  lastVisitedRouteReducer,
})

export type TAppState = any

export default rootReducer
