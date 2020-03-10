import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'react-native'
import { createAppContainer } from 'react-navigation'
import * as Kilt from '@kiltprotocol/sdk-js'
import { Identity, Balance, PublicIdentity } from '@kiltprotocol/sdk-js'
import {
  setIdentity,
  resetIdentity,
  updateBalance,
  updateLastVisitedRoute,
} from '../redux/actions'
import { TMapDispatchToProps } from '../types'
import { TAppState } from '../redux/reducers'
import { CONFIG_CONNECT } from '../config'
import {
  balanceListener,
  getBalanceInKiltCoins,
} from '../services/service.balance'
import { AppLockStatus } from '../enums'
import {
  getCurrentRoute,
  setTopLevelNavigator,
} from '../services/service.navigation'
import RootSwitch from '../components/navigation/RootSwitch'
import { promptUserAndGetIdentityDecrypted } from '../services/service.keychain'
import LockScreen from '../components/LockScreen'

const Navigation = createAppContainer(RootSwitch)

type Props = {
  setIdentityInStore: typeof setIdentity
  resetIdentityInStore: typeof resetIdentity
  updateBalanceInStore: typeof updateBalance
  identityFromStore: Identity | null
  publicIdentityFromStore: PublicIdentity | null
  updateLastVisitedRouteInStore: typeof updateLastVisitedRoute
}

class AppRoot extends React.Component<Props> {
  state = {
    appUiState: AppState.currentState,
  }

  async componentDidMount(): Promise<void> {
    if (this.getAppLockStatus() === AppLockStatus.SetUpAndLocked) {
      await this.promptAndSetDecryptedIdentity()
    }
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  async componentDidUpdate(prevProps: Props): Promise<void> {
    const prevIdentityFromStore = prevProps.identityFromStore
    const {
      identityFromStore,
      publicIdentityFromStore,
      updateBalanceInStore,
    } = this.props
    if (prevIdentityFromStore !== identityFromStore) {
      // the identity has been decrypted
      if (identityFromStore && publicIdentityFromStore) {
        await this.connectAndListen()
        const balance = await getBalanceInKiltCoins(
          publicIdentityFromStore.address
        )
        updateBalanceInStore(balance)
      } else {
        await this.disconnect()
      }
    }
  }

  async componentWillUnmount(): Promise<void> {
    // disconnect from socket
    await this.disconnect()
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  getAppLockStatus(): AppLockStatus {
    const { identityFromStore, publicIdentityFromStore } = this.props
    if (identityFromStore) {
      return AppLockStatus.SetUpAndUnlocked
    }
    if (!identityFromStore && publicIdentityFromStore) {
      return AppLockStatus.SetUpAndLocked
    }
    if (!identityFromStore && !publicIdentityFromStore) {
      return AppLockStatus.NotSetUp
    }
    return AppLockStatus.Unknown
  }

  handleAppStateChange = async nextAppUiState => {
    const { resetIdentityInStore } = this.props
    const { appUiState } = this.state
    if (
      this.getAppLockStatus() === AppLockStatus.SetUpAndUnlocked &&
      appUiState === 'active' &&
      nextAppUiState.match(/inactive|background/)
    ) {
      console.info('[ENCRYPTION] UI = inactive|background => reset identity')
      resetIdentityInStore()
    } else if (
      this.getAppLockStatus() === AppLockStatus.SetUpAndLocked &&
      nextAppUiState === 'active'
    ) {
      console.info(
        '[ENCRYPTION] UI = active, no identity in store => prompt user'
      )
      // prompt user for secret to make identity available
      await this.promptAndSetDecryptedIdentity()
    }
    this.setState({ appUiState: nextAppUiState })
  }

  async connectAndListen(): Promise<void> {
    const { publicIdentityFromStore } = this.props
    if (publicIdentityFromStore) {
      console.info('[SOCKET] Connecting and listening...')
      await Kilt.default.connect(CONFIG_CONNECT.BLOCKCHAIN_NODE)
      await Balance.listenToBalanceChanges(
        publicIdentityFromStore.address,
        balanceListener
      )
      console.info('[SOCKET] OK connected')
    }
  }

  async disconnect(): Promise<void> {
    await Kilt.default.disconnect(CONFIG_CONNECT.BLOCKCHAIN_NODE)
    console.info('[SOCKET] Disconnected')
  }

  async promptAndSetDecryptedIdentity(): Promise<void> {
    console.info('[ENCRYPTION] Decrypting and setting identity in store')
    const { setIdentityInStore } = this.props
    const identityDecrypted = await promptUserAndGetIdentityDecrypted()
    // add decrypted identity to Redux store for use anywhere in the app, until user leaves the app again OR screen locks
    setIdentityInStore(identityDecrypted)
  }

  render(): JSX.Element {
    const { updateLastVisitedRouteInStore } = this.props
    /* if the app goes in the background (= another app is used) or becomes inactive (= user scrolls through apps, iOS only):
    hide its contents, like in a banking app */
    const showAppContents =
      this.getAppLockStatus() === AppLockStatus.NotSetUp ||
      this.getAppLockStatus() === AppLockStatus.SetUpAndUnlocked

    return (
      <>
        {showAppContents ? (
          <Navigation
            onNavigationStateChange={() => {
              const currentRoute = getCurrentRoute()
              updateLastVisitedRouteInStore(
                currentRoute ? currentRoute.routeName : ''
              )
            }}
            ref={navigatorRef => {
              setTopLevelNavigator(navigatorRef)
            }}
          />
        ) : (
          <LockScreen />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: TAppState): TAppState => ({
  identityFromStore: state.identityReducer.identity,
  publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
})

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => ({
  setIdentityInStore: (identity: Identity) => {
    dispatch(setIdentity(identity))
  },
  resetIdentityInStore: () => {
    dispatch(resetIdentity())
  },
  updateBalanceInStore: (balance: number) => {
    dispatch(updateBalance(balance))
  },
  updateLastVisitedRouteInStore: (route: string) => {
    dispatch(updateLastVisitedRoute(route))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoot)
