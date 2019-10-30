import React from 'react'
import { View, Text } from 'react-native'
import KiltButton from '../components/KiltButton'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
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
import WithIntroBackground from './WithIntroBackground'

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Introduction = ({ navigation }: IProps): JSX.Element => (
  <WithIntroBackground>
    <View style={mainViewContainer}>
      <View style={sectionContainer}>
        <Text style={mainTitleTxt}>Credentials for web3.</Text>
      </View>
      <View style={sectionContainer}>
        <Text style={sectionTitleTxt}>This is your very own KILT wallet.</Text>
        <Text style={bodyTxt}>
          Your wallet is the place for you to request and store all of your
          credentials.
        </Text>
      </View>
      <View style={sectionContainer}>
        <View style={flexRowEndLayout}>
          <KiltButton
            title="Get started >"
            onPress={() => navigation.navigate(MNEMONIC_CREATION)}
          />
        </View>
      </View>
    </View>
  </WithIntroBackground>
)

Introduction.navigationOptions = {
  header: null,
}

export default Introduction
