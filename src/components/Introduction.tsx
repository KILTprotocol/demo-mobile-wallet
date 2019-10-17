import React from 'react'
import { View, Text } from 'react-native'
import KiltButton from '../components/KiltButton'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  NavigationComponent,
} from 'react-navigation'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEndLayout,
} from '../sharedStyles/styles.layout'
import {
  bodyTxt,
  mainTitleTxt,
  sectionTitleTxt,
} from '../sharedStyles/styles.typography'
import { MNEMONIC_CREATION } from '../_routes'

interface IOptions {
  header: any
}

interface IProps
  extends NavigationScreenProp<NavigationState, NavigationParams> {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Introduction: NavigationComponent<IOptions, IProps> = (
  props: IProps
): JSX.Element => (
  <View style={mainViewContainer}>
    <View style={sectionContainer}>
      <Text style={mainTitleTxt}>Claim independence.</Text>
    </View>
    <View style={sectionContainer}>
      <Text style={sectionTitleTxt}>This is your very own KILT wallet.</Text>
      <Text style={bodyTxt}>Here, you can... (description)</Text>
    </View>
    <View style={sectionContainer}>
      <View style={flexRowEndLayout}>
        <KiltButton
          title="Get started >"
          onPress={() => props.navigation.navigate(MNEMONIC_CREATION)}
        />
      </View>
    </View>
  </View>
)

Introduction.navigationOptions = {
  header: null,
}

export default Introduction
