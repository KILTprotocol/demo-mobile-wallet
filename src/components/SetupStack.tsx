import { createStackNavigator } from 'react-navigation-stack'
import Introduction from './Introduction'
import MnemonicCreation from '../containers/MnemonicCreation'
import IdentitySetup from '../containers/IdentitySetup'
import { INTRODUCTION, MNEMONIC_CREATION, IDENTITY_SETUP } from '../_routes'

export const SetupStack = createStackNavigator({
  [INTRODUCTION]: Introduction,
  [MNEMONIC_CREATION]: MnemonicCreation,
  [IDENTITY_SETUP]: IdentitySetup,
})

export default SetupStack
