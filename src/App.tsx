import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import AppWrapped from './containers/AppWrapped'

class App extends React.Component {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapped />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
