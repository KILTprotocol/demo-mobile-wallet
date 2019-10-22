import { createStackNavigator } from 'react-navigation-stack'
import Home from './Home'
import { HOME } from '../_routes'

const AppStack = createStackNavigator({ [HOME]: Home })

export default AppStack
