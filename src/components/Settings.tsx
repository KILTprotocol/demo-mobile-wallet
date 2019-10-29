import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowCenterLayout,
} from '../sharedStyles/styles.layout'
import { mainTitleTxt } from '../sharedStyles/styles.typography'
import { APP_STARTUP } from '../_routes'
import WithDefaultBackground from './WithDefaultBackground'
import { resetIdentity } from '../redux/actions'
import { Identity } from '@kiltprotocol/sdk-js'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  resetIdentityInStore: typeof resetIdentity
  identityFromStore: Identity | null
}

class Settings extends React.Component<Props, null> {
  componentDidUpdate(): void {
    // we might want to move this logics up to a higher level component
    const { identityFromStore, navigation } = this.props
    // if the identity is reset, navigate to app startup to let the user set their identity anew
    if (!identityFromStore) {
      navigation.navigate(APP_STARTUP)
    }
  }

  render(): JSX.Element {
    const { resetIdentityInStore } = this.props
    return (
      <WithDefaultBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Settings</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenterLayout}>
              {/* TODO about credentials deletion: what happens if 2 credentials with the same content but different timestamps are created */}
              <KiltButton
                title="Reset identity"
                onPress={() => {
                  resetIdentityInStore()
                }}
              />
            </View>
            <View style={flexRowCenterLayout}>
              <KiltButton
                title="Delete all credentials from this wallet (feature coming soon)"
                disabled
                onPress={() => {
                  console.log('pressed')
                }}
              />
            </View>
          </View>
        </View>
      </WithDefaultBackground>
    )
  }
}

Settings.navigationOptions = {
  header: null,
}

const mapStateToProps = state => {
  return {
    identityFromStore: state.identityReducer.identity,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetIdentityInStore: () => {
      dispatch(resetIdentity())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
