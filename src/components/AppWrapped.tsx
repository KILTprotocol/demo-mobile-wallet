import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState, ImageBackground } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { getGenericPassword } from 'react-native-keychain'
import * as Kilt from '@kiltprotocol/sdk-js'
import {
  Identity,
  BlockchainApiConnection,
  Balance,
  PublicIdentity,
} from '@kiltprotocol/sdk-js'
import { APP_STARTUP, APP, SETUP } from '../_routes'
import AppStack from '../components/AppStack'
import SetupStack from '../components/SetupStack'
import AppStartup from '../containers/AppStartup'
import { imgBckgrd } from '../sharedStyles/styles.layout'
import { setIdentity, resetIdentity, updateBalance } from '../redux/actions'
import { TMapDispatchToProps } from '../_types'
import { TAppState } from '../redux/reducers'
import { BLOCKCHAIN_NODE } from '../_config'
import {
  balanceListener,
  getBalanceInKiltCoins,
} from '../services/service.balance'
import { AppLockStatus } from '../_enums'

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
  updateBalanceInStore: typeof updateBalance
  identityFromStore: Identity | null
  publicIdentityFromStore: PublicIdentity | null
}

class AppWrapped extends React.Component<Props> {
  state = {
    appState: AppState.currentState,
  }

  getAppLockStatus(): AppLockStatus {
    const { identityFromStore, publicIdentityFromStore } = this.props
    if (identityFromStore) {
      return AppLockStatus.SetUpAndUnlocked
    } else if (!identityFromStore && publicIdentityFromStore) {
      return AppLockStatus.SetUpAndLocked
    } else if (!identityFromStore && !publicIdentityFromStore) {
      return AppLockStatus.NotSetUp
    } else {
      return AppLockStatus.Unknown
    }
  }

  async componentDidMount(): Promise<void> {
    if (this.getAppLockStatus() === AppLockStatus.SetUpAndLocked) {
      await this.promptForSecretAndSetIdentity()
    }
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  async componentDidUpdate(prevProps: Props): Promise<void> {
    const prevIdentityFromStore = prevProps.identityFromStore
    const {
      identityFromStore,
      publicIdentityFromStore,
      updateBalanceInStore,
    } = this.props
    // id has just been set up
    if (prevIdentityFromStore !== identityFromStore) {
      if (identityFromStore) {
        console.info('[SOCKET] Reconnecting.......')
        await this.connectAndListen()

        if (publicIdentityFromStore) {
          const bal = await getBalanceInKiltCoins(
            publicIdentityFromStore.address
          )
          updateBalanceInStore(bal)
        }
      } else {
        // todo bug stream end encountered VS web socket connection not properly reopened once closed
        await this.disconnect()
      }
    }
  }

  async componentWillUnmount(): Promise<void> {
    await this.disconnect()
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  async disconnect(): Promise<void> {
    console.info('[SOCKET] Try disconnecting.......')
    const blockchain = await BlockchainApiConnection.getCached(BLOCKCHAIN_NODE)
    if (blockchain) {
      try {
        await blockchain.api.disconnect()
        Kilt.BlockchainApiConnection.clearCache()
        console.info('[SOCKET] OK disconnected')
      } catch (error) {
        console.info(error)
      }
    }
  }

  async connectAndListen(): Promise<void> {
    // TODO prio bug in token transfer: 1 too much
    // not reconnecting when app comes back from background!
    // but ok when totally switched off (??)
    const { publicIdentityFromStore } = this.props
    if (publicIdentityFromStore) {
      console.info('[SOCKET] Connecting and listening........')
      const blockchainAPI = await Kilt.default.connect(BLOCKCHAIN_NODE)
      // blockchainAPI.api.disconnect
      console.info('---------------------------blockchainAPI', blockchainAPI)
      await Balance.listenToBalanceChanges(
        publicIdentityFromStore.address,
        balanceListener
      )
      console.info('[SOCKET] OK connected')
    }
  }

  async promptForSecretAndSetIdentity(): Promise<void> {
    const { setIdentityInStore } = this.props
    const identityWrapper = await getGenericPassword()
    if (identityWrapper) {
      // decrypt identity
      const identityDecrypted = JSON.parse(identityWrapper.password)
      // add decrypted identity to Redux store for use anywhere in the app, until user leaves the app again OR screen locks
      // todo async
      setIdentityInStore(identityDecrypted)
      console.info('[ENCRYPTION] Identity set in store')
    }
  }

  // todo refactor identity setup vs app wrapper: there's duplicated code
  // todo refactor
  // todo move to containers
  // todo merge app wrapped and app startup?
  // todo clean async _handleAppStateChange(nextAppState) {
  _handleAppStateChange = async nextAppState => {
    const {
      setIdentityInStore,
      resetIdentityInStore,
      identityFromStore,
      publicIdentityFromStore,
    } = this.props
    console.info(
      `[APP STATE] changed:  ${this.state.appState} ==> ${nextAppState} (identityFromStore: ${identityFromStore}) (publicIdentityFromStore: ${publicIdentityFromStore})`
    )

    if (
      this.getAppLockStatus() === AppLockStatus.SetUpAndUnlocked &&
      // todo use strings for active
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      console.info(
        '[ENCRYPTION] App state matches inactive or background, so we reset identity'
      )
      resetIdentityInStore()
      this.setState({ appState: nextAppState })
    } else if (
      this.getAppLockStatus() === AppLockStatus.SetUpAndLocked &&
      nextAppState === 'active'
    ) {
      console.info(
        '[ENCRYPTION] App state matches active but no identity is in store, so prompt user in order to decrypt'
      )
      // prompt user for secret to make identity available
      await this.promptForSecretAndSetIdentity()
      // only update state once this is finisehd otherwise this is triggered when the modal appears....
      this.setState({ appState: nextAppState })
    } else {
      // app is not setup so we simply update the state
      this.setState({ appState: nextAppState })
    }
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

    const showAppContents =
      this.getAppLockStatus() === AppLockStatus.NotSetUp ||
      this.getAppLockStatus() === AppLockStatus.SetUpAndUnlocked

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
    publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
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
    updateBalanceInStore: (balance: number) => {
      dispatch(updateBalance(balance))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapped)
