import React from 'react'
import Introduction from './Introduction'
import MnemonicCreation from './MnemonicCreation'
import Preparation from './Preparation'

import { createStackNavigator } from 'react-navigation-stack'

export const Setup = createStackNavigator({
  Introduction: Introduction,
  MnemonicCreation: MnemonicCreation,
  Preparation: Preparation,
})

export default Setup
