import React from 'react'
import { View, Text } from 'react-native'
import {
  mainViewContainer,
  sectionContainer,
  sectionTitleTxt,
} from './sharedStyles'
import { Button } from 'react-native'
import PreparationStep from './PreparationStep'

class Preparation extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // todo forbid back navigation

  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>
            Knitting your KILT account together
          </Text>
        </View>
        <View style={sectionContainer}>
          <PreparationStep stepName="Creating your identity" />
        </View>
        <View style={sectionContainer}>
          <PreparationStep stepName="Saving your identity" />
        </View>
        <View style={sectionContainer}>
          <PreparationStep stepName="Tranferring initial tokens to you" />
        </View>
        <Button title="Next >" onPress={() => navigate('')} />
      </View>
    )
  }
}

export default Preparation
