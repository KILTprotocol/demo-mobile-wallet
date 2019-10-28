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
  flexRowCenterLayout,
} from '../sharedStyles/styles.layout'
import { mainTitleTxt } from '../sharedStyles/styles.typography'

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Settings = ({ navigation }: IProps): JSX.Element => (
  <View style={mainViewContainer}>
    <View style={sectionContainer}>
      <Text style={mainTitleTxt}>Settings</Text>
    </View>
    <View style={sectionContainer}>
      <View style={flexRowCenterLayout}>
        <KiltButton
          title="Reset wallet"
          onPress={() => {
            console.log('pressed')
          }}
        />
      </View>
    </View>
  </View>
)

Settings.navigationOptions = {
  header: null,
}

export default Settings
