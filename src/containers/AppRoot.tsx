import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import LockScreen from '../components/LockScreen'
import {
  setIdentity,
  resetIdentity,
  updateBalance,
  updateLastVisitedRoute,
} from '../redux/actions'
import { TMapDispatchToProps } from '../types'
import { TAppState } from '../redux/reducers'
import { getBalanceInKiltCoins } from '../services/service.balance'
import { AppEncryptionStatus, AppUiState } from '../enums'
import {
  getCurrentRoute,
  setTopLevelNavigator,
} from '../services/service.navigation'
import RootSwitch from '../components/navigation/RootSwitch'
import { promptUserAndGetIdentityDecrypted } from '../services/service.keychain'
import { disconnect, connectAndListen } from '../services/service.socket'

const Navigation = createAppContainer(RootSwitch)
const APP_STATE_CHANGE_EVENT = 'change'

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
    if (
      this.getAppEncryptionStatus() === AppEncryptionStatus.SetUpAndEncrypted
    ) {
      await this.promptAndSetDecryptedIdentity()
    }
    AppState.addEventListener(APP_STATE_CHANGE_EVENT, this.handleAppStateChange)
  }

  async componentDidUpdate(prevProps: Props): Promise<void> {
    const prevIdentityFromStore = prevProps.identityFromStore
    const {
      identityFromStore,
      publicIdentityFromStore,
      updateBalanceInStore,
    } = this.props
    if (prevIdentityFromStore !== identityFromStore) {
      // the identity has just been decrypted
      if (identityFromStore && publicIdentityFromStore) {
        await connectAndListen(publicIdentityFromStore.address)
        // eagerly get the balance
        const balance = await getBalanceInKiltCoins(
          publicIdentityFromStore.address
        )
        updateBalanceInStore(balance)
      } else {
        await disconnect()
      }
    }
  }

  async componentWillUnmount(): Promise<void> {
    await disconnect()
    AppState.removeEventListener(
      APP_STATE_CHANGE_EVENT,
      this.handleAppStateChange
    )
  }

  getAppEncryptionStatus(): AppEncryptionStatus {
    const { identityFromStore, publicIdentityFromStore } = this.props
    if (identityFromStore) {
      return AppEncryptionStatus.SetUpAndDecrypted
    }
    if (publicIdentityFromStore && !identityFromStore) {
      return AppEncryptionStatus.SetUpAndEncrypted
    }
    if (!publicIdentityFromStore && !identityFromStore) {
      return AppEncryptionStatus.NotSetUp
    }
    return AppEncryptionStatus.Unknown
  }

  handleAppStateChange = async (nextAppUiState: string): Promise<void> => {
    // if the app goes in the background (= another app is used) or becomes inactive (= user scrolls through apps, iOS-only): we re-encrypt the identity. Re-encrypting the identity means for us that we delete the decrypted identity in the redux store, meaning that no decrypted identity is available anymore. As soon as the decrypted identity is needed again (= as soon as the user needs to use anything in the app, since the identity is used everywhere for messaging, token transfer etc = as soon as the user opens the app or puts it back in focus): the user will be prompted for their touchID or passcode or other. If successful input, this gives us access to the decrypted identity that we add to the redux store again.
    const { resetIdentityInStore } = this.props
    const { appUiState } = this.state
    const appEncryptionStatus = this.getAppEncryptionStatus()
    if (
      appEncryptionStatus === AppEncryptionStatus.SetUpAndDecrypted &&
      appUiState === AppUiState.Active &&
      (nextAppUiState === AppUiState.Inactive ||
        nextAppUiState === AppUiState.Background)
    ) {
      console.info(
        '[ENCRYPTION] App became inactive|background => reset identity'
      )
      resetIdentityInStore()
    } else if (
      appEncryptionStatus === AppEncryptionStatus.SetUpAndEncrypted &&
      nextAppUiState === AppUiState.Active
    ) {
      console.info(
        '[ENCRYPTION] App became active BUT no identity in store => prompt user and decrypt identity'
      )
      await this.promptAndSetDecryptedIdentity()
    }
    this.setState({ appUiState: nextAppUiState })
  }

  async promptAndSetDecryptedIdentity(): Promise<void> {
    console.info('[ENCRYPTION] Decrypting and setting identity in store')
    const { setIdentityInStore } = this.props
    const identityDecrypted = await promptUserAndGetIdentityDecrypted()
    setIdentityInStore(identityDecrypted)
    console.info('[ENCRYPTION] OK identity set in store')
  }

  shouldShowAppContents(): boolean {
    const appEncryptionStatus = this.getAppEncryptionStatus()
    return (
      appEncryptionStatus === AppEncryptionStatus.NotSetUp ||
      appEncryptionStatus === AppEncryptionStatus.SetUpAndDecrypted
    )
  }

  render(): JSX.Element {
    const showAppContents = this.shouldShowAppContents()
    const { updateLastVisitedRouteInStore } = this.props
    if (!showAppContents) {
      // hide the app's contents when the identity is encrypted
      return <LockScreen />
    }
    return (
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
