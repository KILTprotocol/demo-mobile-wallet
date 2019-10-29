import { createBottomTabNavigator } from 'react-navigation-tabs'
import Dashboard from '../containers/Dashboard'
import Settings from './Settings'
import { CONTACTS, DASHBOARD, SETTINGS } from '../_routes'
import Contacts from './Contacts'
import { TXT_S_SIZE } from '../sharedStyles/styles.consts.typography'
import {
  KILT_PURPLE_CLR,
  TXT_INVERTED_CLR,
  TXT_INVERTED_LIGHT_CLR,
} from '../sharedStyles/styles.consts.colors'

const tabBarOptions = {
  activeTintColor: TXT_INVERTED_CLR,
  inactiveTintColor: TXT_INVERTED_LIGHT_CLR,
  labelStyle: {
    fontSize: TXT_S_SIZE,
  },
  style: {
    backgroundColor: KILT_PURPLE_CLR,
  },
}

const TabNavigator = createBottomTabNavigator(
  {
    [DASHBOARD]: Dashboard,
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
