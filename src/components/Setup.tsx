import Introduction from './Introduction'
import MnemonicCreation from '../containers/MnemonicCreation'
import IdentitySetup from '../containers/IdentitySetup'

import { createStackNavigator } from 'react-navigation-stack'

export const Setup = createStackNavigator({
  Introduction: Introduction,
  MnemonicCreation: MnemonicCreation,
  IdentitySetup: IdentitySetup,
})

export default Setup
