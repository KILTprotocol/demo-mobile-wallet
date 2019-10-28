import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Identity } from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { AppState } from '../redux/reducers'
import IdentityDisplay from './IdentityDisplay'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import {
  sectionTitleTxt,
  mainTitleTxt,
} from '../sharedStyles/styles.typography'

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identity: Identity
}

const Dashboard = ({ navigation, identity }: IProps): JSX.Element => (
  <View style={mainViewContainer}>
    <View style={sectionContainer}>
      <Text style={mainTitleTxt}>Dashboard</Text>
    </View>
    <View style={sectionContainer}>
      <Text style={sectionTitleTxt}>Me</Text>
      <IdentityDisplay address={identity.address} />
    </View>
    <View style={sectionContainer}>
      <Text style={sectionTitleTxt}>My claims</Text>
      <KiltButton
        title="Create driver's license"
        onPress={() => {
          console.log('pressed')
        }}
      />
    </View>
  </View>
)

Dashboard.navigationOptions = {
  header: null,
}

const mapStateToProps = (state: AppState) => ({
  identity: state.identity,
})

export default connect(mapStateToProps)(Dashboard)
