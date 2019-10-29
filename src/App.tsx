import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { PersistGate } from 'redux-persist/integration/react'
import { APP_STARTUP, APP, SETUP } from './_routes'
import AppStack from './components/AppStack'
import SetupStack from './components/SetupStack'
import AppStartup from './containers/AppStartup'
import { store, persistor } from './redux/store'

const RootSwitch = createSwitchNavigator(
  {
    [APP_STARTUP]: AppStartup,
    [APP]: AppStack,
    [SETUP]: SetupStack,
  },
  {
    initialRouteName: APP_STARTUP,
  }
)

const Navigation = createAppContainer(RootSwitch)

export default class App extends React.Component {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}
