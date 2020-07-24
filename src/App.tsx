import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './redux/store'
import AppRoot from './containers/AppRoot'

const App: React.FunctionComponent = (): JSX.Element => {
  StatusBar.setBarStyle('dark-content', true)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoot />
      </PersistGate>
    </Provider>
  )
}

export default App
