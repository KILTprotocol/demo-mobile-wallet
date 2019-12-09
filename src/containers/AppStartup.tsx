import React from 'react'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { View } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import {
  APP,
  DASHBOARD,
  ACCOUNT,
  CONTACTS,
  SETTINGS,
  MNEMONIC_CREATION,
  INTRODUCTION,
  USERNAME_SETUP,
} from '../_routes'
import { mainViewContainer, fullCenter } from '../sharedStyles/styles.layout'
import { TAppState } from '../redux/reducers'
import { TMapStateToProps } from '../_types'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  publicIdentityFromStore: PublicIdentity | null
  lastVisitedRouteFromStore: string
}

class AppStartup extends React.Component<Props> {
  componentDidMount(): void {
    this.bootstrapAsync()
  }

  bootstrapAsync = async () => {
    const {
      publicIdentityFromStore,
      navigation,
      lastVisitedRouteFromStore,
    } = this.props
    // if an identity is already set up, navigate to the regular app
    // if not, navigate to the identity setup screen
    // todoprio draw this
    // todoprio what if there's a public identity and last visited route is setup-wise? (which wouldn't make sense); also, last visited route is not used for setup screen
    // todo document that public id is used as a way to determine whether setup has been done
    // todo also probably the hide screen should be a dedicated route???
    // navigation.navigate(lastVisitedRouteFromStore)

    if (
      (publicIdentityFromStore &&
        [DASHBOARD, ACCOUNT, CONTACTS, SETTINGS].includes(
          lastVisitedRouteFromStore
        )) ||
      (publicIdentityFromStore &&
        [MNEMONIC_CREATION, INTRODUCTION, USERNAME_SETUP].includes(
          lastVisitedRouteFromStore
        ))
    ) {
      navigation.navigate(lastVisitedRouteFromStore)
    } else {
      navigation.navigate(publicIdentityFromStore ? APP : INTRODUCTION)
    }
  }

  render(): JSX.Element {
    return (
      <View style={mainViewContainer}>
        <View style={fullCenter}>
          <LoadingIndicator />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => {
  return {
    publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
    lastVisitedRouteFromStore: state.lastVisitedRouteReducer.lastVisitedRoute,
  }
}

export default connect(mapStateToProps, null)(AppStartup)
