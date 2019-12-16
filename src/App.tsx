import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import AppRoot from './containers/AppRoot'

class App extends React.Component {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoot />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
