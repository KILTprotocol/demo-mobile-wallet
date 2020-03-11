import React from 'react'
import { View, Text } from 'react-native'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import StyledButton from './StyledButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEnd,
} from '../sharedStyles/styles.layout'
import {
  bodyTxt,
  h1,
  h2,
  bodyInvertedClrTxt,
  titleInvertedClrTxt,
  emphasizedClrTxt,
} from '../sharedStyles/styles.typography'
import { USERNAME_SETUP } from '../routes'
import WithIntroBackground from './WithIntroBackground'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Introduction: React.FunctionComponent<Props> = ({
  navigation,
}): JSX.Element => (
  <WithIntroBackground>
    <View style={mainViewContainer}>
      <View style={sectionContainer}>
        <Text style={[h1, emphasizedClrTxt]}>
          KILT - Your credentials for the web3.
        </Text>
      </View>
      <View style={sectionContainer}>
        <Text style={[h2, titleInvertedClrTxt]}>
          This is your very own credentials wallet.
        </Text>
        <Text style={[bodyTxt, bodyInvertedClrTxt]}>
          Your wallet is the place for you to request and store all of your
          credentials.
        </Text>
      </View>
      <View style={sectionContainer}>
        <View style={flexRowEnd}>
          <StyledButton
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
