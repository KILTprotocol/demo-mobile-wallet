import { createBottomTabNavigator } from 'react-navigation-tabs'
import { ACCOUNT, CONTACTS, DASHBOARD, SETTINGS } from '../../_routes'
import Account from '../../containers/Account'
import Dashboard from '../../containers/Dashboard'
import Contacts from '../../containers/Contacts'
import Settings from '../../containers/Settings'
import { TXT_XS_SIZE } from '../../sharedStyles/styles.consts.typography'
import {
  CLR_KILT_1,
  CLR_TXT_INVERTED,
  CLR_TXT_INVERTED_LIGHT,
} from '../../sharedStyles/styles.consts.colors'

const tabBarOptions = {
  activeTintColor: CLR_TXT_INVERTED,
  inactiveTintColor: CLR_TXT_INVERTED_LIGHT,
  labelStyle: {
    fontSize: TXT_XS_SIZE,
  },
  style: {
    backgroundColor: CLR_KILT_1,
    height: 64,
    paddingVertical: 18,
  },
}

const AppTabs = createBottomTabNavigator(
  {
    [DASHBOARD]: Dashboard,
    [ACCOUNT]: Account,
    [CONTACTS]: Contacts,
    [SETTINGS]: Settings,
  },
  {
    tabBarOptions,
  }
)

AppTabs.navigationOptions = {
  header: null,
}

export default AppTabs
