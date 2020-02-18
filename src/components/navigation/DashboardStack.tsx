import { createStackNavigator } from 'react-navigation-stack'
import { DASHBOARD, NEW_CLAIM } from '../../routes'
import Dashboard from '../../containers/Dashboard'
import NewClaim from '../NewClaim'

const DashboardStack = createStackNavigator({
  [DASHBOARD]: Dashboard,
  [NEW_CLAIM]: NewClaim,
})

export default DashboardStack
