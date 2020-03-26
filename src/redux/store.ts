import { createStore, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleware = [thunk]

// config for redux-persist; redux-persists syncs redux state with the device's AsyncStorage data
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist = reducers for which we want to persist the state in AsyncStorage
  whitelist: [
    'publicIdentityReducer',
    'claimsReducer',
    'contactsReducer',
    'balanceReducer',
    'usernameReducer',
    'lastVisitedRouteReducer',
    'oldMessagesReducer',
  ],
  blacklist: ['identityReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(...middleware))
const persistor = persistStore(store)

export { store, persistor }
