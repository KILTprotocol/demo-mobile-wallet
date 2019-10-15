import IntroductionScreen from './IntroductionScreen'
import MnemonicCreationScreen from './MnemonicCreationScreen'
import IdentitySetupScreen from './IdentitySetupScreen'

import { createStackNavigator } from 'react-navigation-stack'

export const Setup = createStackNavigator({
  Introduction: IntroductionScreen,
  MnemonicCreation: MnemonicCreationScreen,
  IdentitySetup: IdentitySetupScreen,
})

export default Setup
