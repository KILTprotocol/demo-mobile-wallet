import { createBottomTabNavigator } from 'react-navigation-tabs'
import { ACCOUNT, CONTACTS, DASHBOARD, SETTINGS } from '../_routes'
import Account from './Account'
import Dashboard from '../containers/Dashboard'
import Settings from './Settings'
import Contacts from './Contacts'
import { TXT_XS_SIZE } from '../sharedStyles/styles.consts.typography'
import {
  KILT_PURPLE_CLR,
  TXT_INVERTED_CLR,
  TXT_INVERTED_LIGHT_CLR,
} from '../sharedStyles/styles.consts.colors'

const tabBarOptions = {
  activeTintColor: TXT_INVERTED_CLR,
  inactiveTintColor: TXT_INVERTED_LIGHT_CLR,
  labelStyle: {
    fontSize: TXT_XS_SIZE,
  },
  style: {
    backgroundColor: KILT_PURPLE_CLR,
    height: 64,
    paddingVertical: 18,
  },
}

const TabNavigator = createBottomTabNavigator(
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

TabNavigator.navigationOptions = {
  header: null,
}

export default TabNavigator
