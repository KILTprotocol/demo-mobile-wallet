import React from 'react'
import { View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import {
  mainViewContainer,
  sectionContainer,
  sectionTitleTxt,
} from './styles/sharedStyles'
import { Button } from 'react-native'
import PreparationStep from './PreparationStep'

class Preparation extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // todo forbid back navigation

  createIdentity(mnemonic) {
    const identity = Kilt.Identity.buildFromMnemonic(mnemonic)
  }

  async componentDidMount() {
    // console.log('hi')
    // const blockchain = await Kilt.default.connect(
    //   'wss://full-nodes.kilt.io:9944'
    // )
  }

  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>
            Step 2: Knitting your KILT account together
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
