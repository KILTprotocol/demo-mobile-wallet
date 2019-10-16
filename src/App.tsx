import Setup from './components/Setup'
import Home from './components/Home'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React from 'react'

const RootStack = createSwitchNavigator({
  Setup: {
    screen: Setup,
  },
  Home: {
    screen: Home,
  },
})

// const App = createAppContainer(RootStack)

const AppContainer = createAppContainer(RootStack)

class App extends React.Component {
  someEvent() {}
  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav
        }}
      />
    )
  }
}

export default App
