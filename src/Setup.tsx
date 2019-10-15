import React from 'react'
import Introduction from './Introduction'
import MnemonicCreation from './MnemonicCreation'
import IdentitySetup from './IdentitySetup'

import { createStackNavigator } from 'react-navigation-stack'

export const Setup = createStackNavigator({
  Introduction: Introduction,
  MnemonicCreation: MnemonicCreation,
  IdentitySetup: IdentitySetup,
})

export default Setup
