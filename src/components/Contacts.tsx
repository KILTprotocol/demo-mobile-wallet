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
import WithDefaultBackground from './WithDefaultBackground'

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Contacts = ({ navigation }: IProps): JSX.Element => (
  <WithDefaultBackground>
    <View style={mainViewContainer}>
      <View style={sectionContainer}>
        <Text style={mainTitleTxt}>Contacts</Text>
      </View>
      <View style={sectionContainer}>
        <View style={flexRowCenterLayout}>
          <KiltButton
            title="Add contact (not implemented)"
            disabled
            onPress={() => {
              navigation.navigate('')
            }}
          />
        </View>
      </View>
    </View>
  </WithDefaultBackground>
)

export default Contacts
