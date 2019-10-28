import { createBottomTabNavigator } from 'react-navigation-tabs'
import Dashboard from './Dashboard'
import Settings from './Settings'
import { CONTACTS, DASHBOARD, SETTINGS } from '../_routes'
import Contacts from './Contacts'

const TabNavigator = createBottomTabNavigator({
  [DASHBOARD]: Dashboard,
  [CONTACTS]: Contacts,
  [SETTINGS]: Settings,
})

TabNavigator.navigationOptions = {
  header: null,
}

export default TabNavigator
