import { createStackNavigator } from 'react-navigation-stack'
import Introduction from '../Introduction'
import MnemonicCreation from '../MnemonicCreation'
import IdentitySetup from '../../containers/IdentitySetup'
import UsernameSetup from '../../containers/UsernameSetup'
import Device from '../../containers/Device'
import {
  INTRODUCTION,
  MNEMONIC_CREATION,
  IDENTITY_SETUP,
  USERNAME_SETUP,
  DEVICE,
} from '../../routes'

const SetupStack = createStackNavigator({
  [INTRODUCTION]: Introduction,
  [USERNAME_SETUP]: UsernameSetup,
  [MNEMONIC_CREATION]: MnemonicCreation,
  [IDENTITY_SETUP]: IdentitySetup,
  [DEVICE]: Device,
})

export default SetupStack
