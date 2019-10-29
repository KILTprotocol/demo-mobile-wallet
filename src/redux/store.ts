import { createStore, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]

// config for redux-persist, that syncs redux state with AsyncStorage data
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist = reducers for which we want to persist the state in AsyncStorage
  whitelist: ['identityReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(...middleware))
let persistor = persistStore(store)

export { store, persistor }
