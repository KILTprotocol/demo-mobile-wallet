import React from 'react'
import { View, Text } from 'react-native'
import { Dispatch } from 'redux'
import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { AsyncStatus } from '../_enums'
import { HOME } from '../_routes'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEndLayout,
} from '../sharedStyles/styles.layout'
import {
  sectionTitleTxt,
  titleInvertedClrTxt,
} from '../sharedStyles/styles.typography'
import IdentitySetupStep from '../components/IdentitySetupStep'
import { callWithDelay } from '../utils/utils.async'
import { setPublicIdentity, setIdentity } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import WithIntroBackground from '../components/WithIntroBackground'
import { TMapDispatchToProps } from '../_types'
import { getGenericPassword } from 'react-native-keychain'

const STEP_CREATE = 'create'
const STEP_SAVE = 'save'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  stepDescriptions: object
  identityFromStore: Identity | null
  setIdentityInStore: typeof setIdentity
  publicIdentityFromStore: PublicIdentity | null
  setPublicIdentityInStore: typeof setPublicIdentity
}

type State = {
  isNextBtnDisabled: boolean
  stepStatuses: object
}

class IdentitySetup extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    isNextBtnDisabled: true,
    stepStatuses: {
      [STEP_CREATE]: AsyncStatus.Pending,
      [STEP_SAVE]: AsyncStatus.NotStarted,
    },
  }

  // TODO move to utility file
  createIdentity = (mnemonic: string) => Identity.buildFromMnemonic(mnemonic)

  componentDidUpdate(prevProps: Props): void {
    const { publicIdentityFromStore } = this.props
    // TODO check f setup is behaving properly and what heppns if i switch apps before end of setup
    if (
      prevProps.publicIdentityFromStore !== publicIdentityFromStore &&
      publicIdentityFromStore !== null
    ) {
      this.setState(prevState => ({
        ...prevState,
        stepStatuses: {
          [STEP_CREATE]: AsyncStatus.Success,
          [STEP_SAVE]: AsyncStatus.Success,
        },
        isNextBtnDisabled: false,
      }))
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      navigation,
      setPublicIdentityInStore,
      setIdentityInStore,
    } = this.props
    const mnemonic: string = navigation.getParam('mnemonic')
    const identity = await callWithDelay(this.createIdentity, [mnemonic])
    const publicIdentity = new PublicIdentity(
      identity.address,
      identity.boxPublicKeyAsHex
    )
    // TODO separate these into their own functions
    if (identity && publicIdentity) {
      this.setState(prevState => ({
        ...prevState,
        stepStatuses: {
          [STEP_CREATE]: AsyncStatus.Success,
          [STEP_SAVE]: AsyncStatus.Pending,
        },
      }))
      // ALSO TODO set normal identity!!!!! since at setup
      // ALSO: do we want to ask for thumb already??
      // because at setup time and later on, must be the same person
      // TODO: handle error cases
      // TODO move to utility file
      // TODO use const "identity" for this
      await Keychain.setGenericPassword('identity', JSON.stringify(identity), {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      })
      // TODO cleanup
      const identityWrapper = await getGenericPassword()
      if (identityWrapper) {
        // decrypt identity
        const identityDecrypted = JSON.parse(identityWrapper.password)
        // add decrypted identity to Redux store for use anywhere in the app, until user leaves the app again or screen locks
        setIdentityInStore(identityDecrypted)
      }

      await callWithDelay(setPublicIdentityInStore, [publicIdentity])
    }
  }

  render(): React.ReactNode {
    const { navigation, stepDescriptions } = this.props
    const { isNextBtnDisabled } = this.state
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[sectionTitleTxt, titleInvertedClrTxt]}>
              Step 2: Knitting your KILT account together
            </Text>
          </View>
          {Object.entries(stepDescriptions).map(([name, description]) => (
            <View key={description} style={sectionContainer}>
              <IdentitySetupStep
                description={description}
                status={this.state.stepStatuses[name]}
              />
            </View>
          ))}
          {/* the button is enabled only if all steps were successful */}
          <View style={sectionContainer}>
            <View style={flexRowEndLayout}>
              <KiltButton
                disabled={isNextBtnDisabled}
                title="Next >"
                onPress={() => navigation.navigate(HOME)}
              />
            </View>
          </View>
        </View>
      </WithIntroBackground>
    )
  }
}

IdentitySetup.defaultProps = {
  stepDescriptions: {
    [STEP_CREATE]: 'Creating your identity',
    [STEP_SAVE]: 'Saving your identity',
  },
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
    setPublicIdentityInStore: publicIdentity => {
      dispatch(setPublicIdentity(publicIdentity))
    },
    setIdentityInStore: identity => {
      dispatch(setIdentity(identity))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentitySetup)
