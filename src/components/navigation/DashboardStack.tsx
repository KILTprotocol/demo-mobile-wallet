import { createStackNavigator } from 'react-navigation-stack'
import { DASHBOARD, NEW_CLAIM, SEND_FOR_VERIFICATION } from '../../routes'
import Dashboard from '../../containers/Dashboard'
import NewClaim from '../../containers/NewClaim'
import SendForVerification from '../../containers/SendForVerification'

const DashboardStack = createStackNavigator({
  [DASHBOARD]: Dashboard,
  [NEW_CLAIM]: NewClaim,
  [SEND_FOR_VERIFICATION]: SendForVerification,
})

export default DashboardStack
