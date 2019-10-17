import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { APP_STARTUP, APP, SETUP } from './_routes'
import AppStack from './components/AppStack'
import SetupStack from './components/SetupStack'
import AppStartup from './AppStartup'

export default createAppContainer(
  createSwitchNavigator(
    {
      [APP_STARTUP]: AppStartup,
      [APP]: AppStack,
      [SETUP]: SetupStack,
    },
    {
      initialRouteName: APP_STARTUP,
    }
  )
)
