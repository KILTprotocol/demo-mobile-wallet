import React from 'react'
import store from './redux/store'
import { Provider } from 'react-redux'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { APP_STARTUP, APP, SETUP } from './_routes'
import AppStack from './components/AppStack'
import SetupStack from './components/SetupStack'
import AppStartup from './containers/AppStartup'

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
        <Navigation />
      </Provider>
    )
  }
}
