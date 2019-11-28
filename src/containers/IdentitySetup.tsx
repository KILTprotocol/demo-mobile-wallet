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
import { setPublicIdentity, setIdentity } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import WithIntroBackground from '../components/WithIntroBackground'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { getGenericPassword } from 'react-native-keychain'
import { saveIdentityAsContactInDemoServices } from '../services/service.demo'

const STEP_CREATE = 'create'
const STEP_SAVE = 'save'
const STEP_SECURE = 'secure'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  stepsDescriptions: object
  identityFromStore: Identity | null
  setIdentityInStore: typeof setIdentity
  publicIdentityFromStore: PublicIdentity | null
  setPublicIdentityInStore: typeof setPublicIdentity
  usernameFromStore: string
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
      [STEP_CREATE]: AsyncStatus.NotStarted,
      [STEP_SAVE]: AsyncStatus.NotStarted,
      [STEP_SECURE]: AsyncStatus.NotStarted,
    },
  }

  // TODOprio move to utility file
  createIdentity = (mnemonic: string) => Identity.buildFromMnemonic(mnemonic)

  componentDidUpdate(prevProps: Props): void {
    const { publicIdentityFromStore } = this.props
    // todo is this useful
    if (
      prevProps.publicIdentityFromStore !== publicIdentityFromStore &&
      publicIdentityFromStore !== null
    ) {
      this.setState(prevState => ({
        ...prevState,
        stepStatuses: {
          [STEP_CREATE]: AsyncStatus.Success,
          [STEP_SAVE]: AsyncStatus.Success,
          [STEP_SECURE]: AsyncStatus.Success,
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
      usernameFromStore,
    } = this.props
    const mnemonic: string = navigation.getParam('mnemonic')
    const identity = this.createIdentity(mnemonic)
    const publicIdentity = new PublicIdentity(
      identity.address,
      identity.boxPublicKeyAsHex
    )

    // todo refactor
    const STEP_DURATION_MS = 1000
    const BUFFER_MS = 200

    if (identity && publicIdentity) {
      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          stepStatuses: {
            [STEP_CREATE]: AsyncStatus.Pending,
            [STEP_SAVE]: AsyncStatus.NotStarted,
            [STEP_SECURE]: AsyncStatus.NotStarted,
          },
        }))
      }, BUFFER_MS)

      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          stepStatuses: {
            [STEP_CREATE]: AsyncStatus.Success,
            [STEP_SAVE]: AsyncStatus.Pending,
            [STEP_SECURE]: AsyncStatus.NotStarted,
          },
        }))
      }, STEP_DURATION_MS)

      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          stepStatuses: {
            [STEP_CREATE]: AsyncStatus.Success,
            [STEP_SAVE]: AsyncStatus.Success,
            [STEP_SECURE]: AsyncStatus.Pending,
          },
        }))
      }, 2 * STEP_DURATION_MS)

      // TODO: handle error cases
      // TODO move to utility file
      // TODO separate these into their own functions
      // TODO use const "identity" for this

      setTimeout(async () => {
        // todoprio move to separate file (utility)
        await Keychain.setGenericPassword(
          'identity',
          JSON.stringify(identity),
          {
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
          }
        )

        const identityWrapper = await getGenericPassword()
        if (identityWrapper) {
          // decrypt identity
          const identityDecrypted = JSON.parse(identityWrapper.password)
          setIdentityInStore(identityDecrypted)
        }
        // todo async?
        setPublicIdentityInStore(publicIdentity)
        this.setState(prevState => ({
          ...prevState,
          stepStatuses: {
            [STEP_CREATE]: AsyncStatus.Success,
            [STEP_SAVE]: AsyncStatus.Success,
            [STEP_SECURE]: AsyncStatus.Success,
          },
        }))
        /* Not strictly needed for the demo wallet but it makes demo setup easier.
        Because we're using the demo client app to attest and revoke, 
        the claimer needs to be known in the contact services
        (according to the logics in the demo client) */
        saveIdentityAsContactInDemoServices(publicIdentity, usernameFromStore)
      }, 3 * STEP_DURATION_MS + BUFFER_MS)
    }
  }

  render(): React.ReactNode {
    const { navigation, stepsDescriptions } = this.props
    const { isNextBtnDisabled } = this.state
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[sectionTitleTxt, titleInvertedClrTxt]}>
              Step 3: Knitting your KILT account together
            </Text>
          </View>
          <View style={sectionContainer}>
            {Object.entries(stepsDescriptions).map(([name, description]) => (
              <View key={description} style={sectionContainer}>
                <IdentitySetupStep
                  description={description}
                  status={this.state.stepStatuses[name]}
                />
              </View>
            ))}
          </View>
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
  stepsDescriptions: {
    [STEP_CREATE]: 'Creating your identity',
    [STEP_SAVE]: 'Saving your identity',
    [STEP_SECURE]: 'Securing your wallet: identify yourself',
  },
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => {
  return {
    identityFromStore: state.identityReducer.identity,
    publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
    usernameFromStore: state.usernameReducer.username,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    setPublicIdentityInStore: (publicIdentity: PublicIdentity) => {
      dispatch(setPublicIdentity(publicIdentity))
    },
    setIdentityInStore: (identity: Identity) => {
      dispatch(setIdentity(identity))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentitySetup)
