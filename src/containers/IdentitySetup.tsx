import React from 'react'
import { View, Text } from 'react-native'
import { Dispatch } from 'redux'
import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import { connect } from 'react-redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { CONFIG_CONNECT } from '../config'
import { AsyncStatus } from '../enums'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import { h2, titleInvertedClrTxt } from '../sharedStyles/styles.typography'
import { setPublicIdentity, setIdentity } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import WithIntroBackground from '../components/WithIntroBackground'
import { TMapDispatchToProps, TMapStateToProps } from '../types'
import saveIdentityAsContactInDemoServices from '../services/service.demoClient'
import {
  setIdentityEncrypted,
  promptUserAndGetIdentityDecrypted,
} from '../services/service.keychain'
import { createIdentity } from '../utils/utils.identity'
import { MNEMONIC } from '../navigationParameters'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  setIdentityInStore: typeof setIdentity
  publicIdentityFromStore: PublicIdentity | null
  setPublicIdentityInStore: typeof setPublicIdentity
  usernameFromStore: string
}

type State = {
  isNextBtnDisabled: boolean
  stepStatuses: AsyncStatus[]
}

type FullIdentity = {
  identity: Identity
  publicIdentity: PublicIdentity
}

class IdentitySetup extends React.Component<Props, State> {
  async componentDidMount(): Promise<void> {
    const { identity, publicIdentity } = this.createIdentity()
    await this.saveIdentity(identity, publicIdentity)
  }

  createIdentity(): FullIdentity {
    const { navigation } = this.props
    const mnemonic: string = navigation.getParam(MNEMONIC)
    const identity = createIdentity(mnemonic)
    const publicIdentity = new PublicIdentity(
      identity.address,
      identity.boxPublicKeyAsHex,
      CONFIG_CONNECT.CLAIMER_SERVICE_ADDRESS_DEFAULT
    )
    return { identity, publicIdentity }
  }

  async saveIdentity(
    identity: Identity,
    publicIdentity: PublicIdentity
  ): Promise<void> {
    const {
      setPublicIdentityInStore,
      setIdentityInStore,
      usernameFromStore,
    } = this.props
    if (identity && publicIdentity) {
      await setIdentityEncrypted(identity)
      // prompt user for fingerprint or other method
      const identityDecrypted = await promptUserAndGetIdentityDecrypted()
      if (identityDecrypted) {
        setPublicIdentityInStore(publicIdentity)
        setIdentityInStore(identityDecrypted)
      }
      // only useful because of how the demo-client is implemented
      await saveIdentityAsContactInDemoServices(
        publicIdentity,
        usernameFromStore
      )
    }
  }

  render(): JSX.Element {
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[h2, titleInvertedClrTxt]}>
              Step 3: Setting your identity securely
            </Text>
          </View>
        </View>
      </WithIntroBackground>
    )
  }
}

IdentitySetup.navigationOptions = {
  header: null,
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  identityFromStore: state.identityReducer.identity,
  publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
  usernameFromStore: state.usernameReducer.username,
})

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => ({
  setPublicIdentityInStore: (publicIdentity: PublicIdentity) => {
    dispatch(setPublicIdentity(publicIdentity))
  },
  setIdentityInStore: (identity: Identity) => {
    dispatch(setIdentity(identity))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentitySetup)
