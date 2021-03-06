import { combineReducers } from 'redux'
import balanceReducer from './balanceReducer'
import claimsReducer from './claimsReducer'
import contactsReducer from './contactsReducer'
import identityReducer from './identityReducer'
import publicIdentityReducer from './publicIdentityReducer'
import usernameReducer from './usernameReducer'
import lastVisitedRouteReducer from './lastVisitedRouteReducer'
import oldMessagesReducer from './oldMessagesReducer'

const rootReducer = combineReducers({
  identityReducer,
  publicIdentityReducer,
  claimsReducer,
  contactsReducer,
  balanceReducer,
  usernameReducer,
  lastVisitedRouteReducer,
  oldMessagesReducer,
})

export type TAppState = any

export default rootReducer
