import React from 'react'
import Introduction from './Introduction'
import IdentityCreation from './IdentityCreation'
import Preparation from './Preparation'

import { createStackNavigator } from 'react-navigation-stack'

export const Setup = createStackNavigator({
  Introduction: Introduction,
  IdentityCreation: IdentityCreation,
  Preparation: Preparation,
})

export default Setup
