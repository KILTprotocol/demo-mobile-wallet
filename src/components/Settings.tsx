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
import { resetIdentity, deleteAllCredentials } from '../redux/actions'
import { Identity } from '@kiltprotocol/sdk-js'
import { Dispatch } from 'redux'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { TAppState } from '../redux/reducers'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  resetIdentityInStore: typeof resetIdentity
  deleteAllCredentialsInStore: typeof deleteAllCredentials
}

class Settings extends React.Component<Props, null> {
  static navigationOptions: { header: null }
  componentDidUpdate(): void {
    // we might want to move this logics up to a higher level component
    const { identityFromStore, navigation } = this.props
    // if the identity is reset, navigate to app startup to let the user set their identity anew
    if (!identityFromStore) {
      navigation.navigate(APP_STARTUP)
    }
  }

  render(): JSX.Element {
    const { resetIdentityInStore, deleteAllCredentialsInStore } = this.props
    return (
      <WithDefaultBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Settings</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenterLayout}>
              {/* TODO about credentials deletion: what happens if 2 credentials with the same content but different timestamps are created?? --> should add timestamp on there */}
              <KiltButton
                title="Reset identity"
                onPress={() => {
                  // since only 1 identity for the MVP, resetIdentity means deleting the claims as well
                  resetIdentityInStore()
                  deleteAllCredentialsInStore()
                }}
              />
            </View>
            <View style={flexRowCenterLayout}>
              <KiltButton
                title="Delete all credentials from this wallet"
                onPress={() => {
                  deleteAllCredentialsInStore()
                }}
              />
            </View>
          </View>
        </View>
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => {
  return {
    identityFromStore: state.identityReducer.identity,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    resetIdentityInStore: () => {
      dispatch(resetIdentity())
    },
    deleteAllCredentialsInStore: () => {
      dispatch(deleteAllCredentials())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
