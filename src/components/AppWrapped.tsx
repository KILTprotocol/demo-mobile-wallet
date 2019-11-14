import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState, ImageBackground } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { getGenericPassword } from 'react-native-keychain'
import { Identity } from '@kiltprotocol/sdk-js'
import { APP_STARTUP, APP, SETUP } from '../_routes'
import AppStack from '../components/AppStack'
import SetupStack from '../components/SetupStack'
import AppStartup from '../containers/AppStartup'
import { imgBckgrd } from '../sharedStyles/styles.layout'
import { setIdentity, resetIdentity } from '../redux/actions'
import { TMapDispatchToProps } from '../_types'
import { TAppState } from '../redux/reducers'

const obscurator = require('../assets/imgs/obscurator.jpg')

const RootSwitch = createSwitchNavigator(
  {
    [APP_STARTUP]: AppStartup,
    [APP]: AppStack,
    [SETUP]: SetupStack,
  },
  {
    initialRouteName: APP_STARTUP,
  }
)

const Navigation = createAppContainer(RootSwitch)

type Props = {
  setIdentityInStore: typeof setIdentity
  resetIdentityInStore: typeof resetIdentity
  identityFromStore: Identity | null
}

class AppWrapped extends React.Component<Props> {
  state = {
    appState: AppState.currentState,
  }

  componentDidMount(): void {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  // async _handleAppStateChange(nextAppState) {
  _handleAppStateChange = async nextAppState => {
    const {
      setIdentityInStore,
      resetIdentityInStore,
      identityFromStore,
    } = this.props
    console.log('=========WOWWW === prev app state = ', this.state.appState)
    console.log('=========WOWWW === new app state = ', nextAppState)
    console.log('=========identityFromStore = ', identityFromStore)
    // todo refactor
    // todo move to containers
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // prompt user for user's secret
      const identityWrapper = await getGenericPassword()
      if (identityWrapper) {
        // decrypt identity
        const identityDecrypted = JSON.parse(identityWrapper.password)
        // add decrypted identity to Redux store for use anywhere in the app, until user leaves the app again or screen locks
        setIdentityInStore(identityDecrypted)
      }
    } else if (nextAppState.match(/inactive|background/)) {
      // instead of simple else, simple else was breaking
      // remove identity from Redux store; the user will need to authenticate again to retreive it
      resetIdentityInStore()
    }
    this.setState({ appState: nextAppState })
  }

  // todo move to utils
  isAppActive(): boolean {
    return !this.isAppInactiveOrBackground()
  }

  isAppInactiveOrBackground(): boolean {
    return !!this.state.appState.match(/inactive|background/)
  }

  render(): JSX.Element {
    /* if the app goes in the background (= another app is used) or becomes inactive (! iOS only; when user scrolls through apps): 
    hide its contents, like in a banking app */
    const showAppContents = this.isAppActive()
    return (
      <>
        {showAppContents ? (
          <Navigation />
        ) : (
          <ImageBackground source={obscurator} style={imgBckgrd} />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: TAppState): TAppState => {
  return {
    identityFromStore: state.identityReducer.identity,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    setIdentityInStore: identity => {
      dispatch(setIdentity(identity))
    },
    resetIdentityInStore: () => {
      dispatch(resetIdentity())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapped)
