import { createStackNavigator } from 'react-navigation-stack'
import Introduction from '../Introduction'
import MnemonicCreation from '../MnemonicCreation'
import IdentitySetup from '../../containers/IdentitySetup'
import UsernameSetup from '../../containers/UsernameSetup'
import {
  INTRODUCTION,
  MNEMONIC_CREATION,
  IDENTITY_SETUP,
  USERNAME_SETUP,
} from '../../routes'

const SetupStack = createStackNavigator({
  [INTRODUCTION]: Introduction,
  [USERNAME_SETUP]: UsernameSetup,
  [MNEMONIC_CREATION]: MnemonicCreation,
  [IDENTITY_SETUP]: IdentitySetup,
})

export default SetupStack
