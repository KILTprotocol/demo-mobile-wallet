import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
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
import {
  resetBalance,
  resetIdentity,
  deleteAllCredentials,
  resetPublicIdentity,
} from '../redux/actions'
import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import { Dispatch } from 'redux'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { TAppState } from '../redux/reducers'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  publicIdentityFromStore: PublicIdentity | null
  resetIdentityInStore: typeof resetIdentity
  resetBalanceInStore: typeof resetBalance
  resetPublicIdentityInStore: typeof resetPublicIdentity
  deleteAllCredentialsInStore: typeof deleteAllCredentials
}

class Settings extends React.Component<Props, null> {
  static navigationOptions: { header: null }
  componentDidUpdate(): void {
    // todo: we might want to move this logics up to a higher level component eg AppWrapper
    const { publicIdentityFromStore, navigation } = this.props
    // if the public identity is reset, navigate to app startup to let the user set their identity anew
    if (!publicIdentityFromStore) {
      navigation.navigate(APP_STARTUP)
    }
  }

  resetApp(): void {
    const {
      resetPublicIdentityInStore,
      resetIdentityInStore,
      deleteAllCredentialsInStore,
      resetBalanceInStore,
    } = this.props
    // the app is mono-identity so `resetIdentity` means deleting the claims as well
    // Todo ask user for their thumb!!
    // reset all
    resetPublicIdentityInStore()
    resetIdentityInStore()
    resetBalanceInStore()
    deleteAllCredentialsInStore()
  }

  render(): JSX.Element {
    const { deleteAllCredentialsInStore } = this.props
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Settings</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenterLayout}>
              <KiltButton
                title="Reset app (delete credentials + reset identity and balance)"
                onPress={() => {
                  this.resetApp()
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
        </ScrollView>
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => {
  return {
    identityFromStore: state.identityReducer.identity,
    publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    resetIdentityInStore: () => {
      dispatch(resetIdentity())
    },
    resetPublicIdentityInStore: () => {
      dispatch(resetPublicIdentity())
    },
    deleteAllCredentialsInStore: () => {
      dispatch(deleteAllCredentials())
    },
    resetBalanceInStore: () => {
      dispatch(resetBalance())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
