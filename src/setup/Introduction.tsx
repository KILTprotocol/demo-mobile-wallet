import React from 'react'
import { View, Text } from 'react-native'
import KiltButton from '../sharedComponents/KiltButton'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEndLayout,
} from '../sharedStyles/utils.layout'
import {
  bodyTxt,
  mainTitleTxt,
  sectionTitleTxt,
} from '../sharedStyles/utils.typography'
import { MNEMONIC_CREATION } from '../routes'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class Introduction extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  }

  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={mainTitleTxt}>Claim independence.</Text>
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>
            This is your very own KILT wallet.
          </Text>
          <Text style={bodyTxt}>Here, you can... (description)</Text>
        </View>
        <View style={sectionContainer}>
          <View style={flexRowEndLayout}>
            <KiltButton
              title="Get started >"
              onPress={() => navigate(MNEMONIC_CREATION)}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Introduction
