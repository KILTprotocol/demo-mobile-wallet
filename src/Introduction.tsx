import React from 'react'
import { View, Text } from 'react-native'
import { mainViewContainer, sectionContainer } from './styles/utils.layout'
import {
  bodyTxt,
  mainTitleTxt,
  sectionTitleTxt,
} from './styles/utils.typography'
import { Button } from 'react-native'

class Introduction extends React.Component {
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
        <Button
          title="Get started >"
          onPress={() => navigate('IdentityCreation')}
        />
      </View>
    )
  }
}

export default Introduction
