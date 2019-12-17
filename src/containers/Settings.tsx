import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import { Dispatch } from 'redux'
import KiltButton from '../components/KiltButton'
import WithDefaultBackground from '../components/WithDefaultBackground'
import {
  mainViewContainer,
  sectionContainer,
  flexRowCenter,
} from '../sharedStyles/styles.layout'
import { mainTitleTxt } from '../sharedStyles/styles.typography'
import { APP_STARTUP } from '../_routes'
import {
  resetBalance,
  resetIdentity,
  deleteAllClaims,
  resetPublicIdentity,
  deleteAllContacts,
} from '../redux/actions'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { TAppState } from '../redux/reducers'
import { ButtonType } from '../_enums'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  publicIdentityFromStore: PublicIdentity | null
  resetIdentityInStore: typeof resetIdentity
  resetBalanceInStore: typeof resetBalance
  resetPublicIdentityInStore: typeof resetPublicIdentity
  deleteAllClaimsInStore: typeof deleteAllClaims
  deleteAllContactsInStore: typeof deleteAllContacts
}

class Settings extends React.Component<Props, null> {
  static navigationOptions: { header: null }

  componentDidUpdate(): void {
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
      deleteAllClaimsInStore,
      deleteAllContactsInStore,
      resetBalanceInStore,
    } = this.props
    // the app is mono-identity so `resetIdentity` means deleting the claims as well
    // reset all
    resetPublicIdentityInStore()
    resetIdentityInStore()
    resetBalanceInStore()
    deleteAllClaimsInStore()
    deleteAllContactsInStore()
  }

  render(): JSX.Element {
    const { deleteAllClaimsInStore, deleteAllContactsInStore } = this.props
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Settings</Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowCenter}>
              <KiltButton
                onPress={() => {
                  deleteAllClaimsInStore()
                }}
                title="✕ Delete all credentials from this wallet"
                type={ButtonType.Danger}
              />
            </View>
            <View style={flexRowCenter}>
              <KiltButton
                title="✕ Delete all contacts"
                onPress={() => {
                  deleteAllContactsInStore()
                }}
                type={ButtonType.Danger}
              />
            </View>
            <View style={flexRowCenter}>
              <KiltButton
                onPress={() => {
                  this.resetApp()
                }}
                title="✕✕ Reset app (delete credentials + reset identity and balance)"
                type={ButtonType.Danger}
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
    deleteAllClaimsInStore: () => {
      dispatch(deleteAllClaims())
    },
    deleteAllContactsInStore: () => {
      dispatch(deleteAllContacts())
    },
    resetBalanceInStore: () => {
      dispatch(resetBalance())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)