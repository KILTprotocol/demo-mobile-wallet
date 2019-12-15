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
  flexRowEnd,
} from '../sharedStyles/styles.layout'
import {
  bodyTxt,
  mainTitleTxt,
  sectionTitleTxt,
  bodyInvertedClrTxt,
  titleInvertedClrTxt,
  emphasizedClrTxt,
} from '../sharedStyles/styles.typography'
import { USERNAME_SETUP } from '../_routes'
import WithIntroBackground from './WithIntroBackground'

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Introduction = ({ navigation }: IProps): JSX.Element => (
  <WithIntroBackground>
    <View style={mainViewContainer}>
      <View style={sectionContainer}>
        <Text style={[mainTitleTxt, emphasizedClrTxt]}>
          KILT - Your credentials for web3.
        </Text>
      </View>
      <View style={sectionContainer}>
        <Text style={[sectionTitleTxt, titleInvertedClrTxt]}>
          This is your very own KILT wallet.
        </Text>
        <Text style={[bodyTxt, bodyInvertedClrTxt]}>
          Your wallet is the place for you to request and store all of your
          credentials.
        </Text>
      </View>
      <View style={sectionContainer}>
        <View style={flexRowEnd}>
          <KiltButton
            title="Get started >"
            onPress={() => navigation.navigate(USERNAME_SETUP)}
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
