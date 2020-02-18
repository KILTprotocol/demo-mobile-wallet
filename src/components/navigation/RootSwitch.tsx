import { createSwitchNavigator } from 'react-navigation'
import AppStartup from '../../containers/AppStartup'
import AppTabs from './AppTabs'
import SetupStack from './SetupStack'
import { APP_STARTUP, APP, SETUP } from '../../routes'

const RootSwitch = createSwitchNavigator(
  {
    [APP_STARTUP]: AppStartup,
    [APP]: AppTabs,
    [SETUP]: SetupStack,
  },
  {
    initialRouteName: APP_STARTUP,
  }
)

export default RootSwitch
