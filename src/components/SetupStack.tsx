import { createStackNavigator } from 'react-navigation-stack'
import Introduction from './Introduction'
import MnemonicCreation from '../containers/MnemonicCreation'
import IdentitySetup from '../containers/IdentitySetup'

export const SetupStack = createStackNavigator({
  Introduction: Introduction,
  MnemonicCreation: MnemonicCreation,
  IdentitySetup: IdentitySetup,
})

export default SetupStack
