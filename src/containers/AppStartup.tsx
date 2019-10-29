import React from 'react'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { View } from 'react-native'
import { setIdentity } from '../redux/actions'
import { getIdentity } from '../services/service.identity'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import { APP, SETUP } from '../_routes'
import { mainViewContainer, fullCenter } from '../sharedStyles/styles.layout'
import { callWithDelay } from '../utils/utils.async'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  setIdentity: typeof setIdentity
}

class AppStartup extends React.Component<Props> {
  componentDidMount(): void {
    this.bootstrapAsync()
  }

  bootstrapAsync = async () => {
    const { navigation, setIdentity } = this.props
    const identity = await callWithDelay(getIdentity)
    console.log('identity', identity)
    setIdentity(identity)
    // if an identity is already set up, navigate to the regular app; otherwise talke the user to the identity setup screen
    navigation.navigate(identity ? APP : SETUP)
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

const mapStateToProps = state => {
  return {
    identity: state.identity,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIdentity: identity => {
      dispatch(setIdentity(identity))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStartup)
