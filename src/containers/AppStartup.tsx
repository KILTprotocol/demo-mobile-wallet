import React from 'react'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { View } from 'react-native'
import { Identity } from '@kiltprotocol/sdk-js'
import { setIdentity } from '../redux/actions'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import { APP, SETUP } from '../_routes'
import { mainViewContainer, fullCenter } from '../sharedStyles/styles.layout'
import { AppState } from 'src/redux/reducers'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  setIdentityInStore: typeof setIdentity
  identityFromStore: Identity | null
}

class AppStartup extends React.Component<Props> {
  componentDidMount(): void {
    this.bootstrapAsync()
  }

  bootstrapAsync = async () => {
    const { identityFromStore, navigation } = this.props
    // if an identity is already set up, navigate to the regular app; otherwise talke the user to the identity setup screen
    navigation.navigate(identityFromStore ? APP : SETUP)
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

const mapStateToProps = (state: AppState) => {
  return {
    identityFromStore: state.identityReducer.identity,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIdentityInStore: (identity: Identity) => {
      dispatch(setIdentity(identity))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStartup)
