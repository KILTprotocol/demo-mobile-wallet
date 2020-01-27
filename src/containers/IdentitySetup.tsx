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
import { AsyncStatus } from '../_enums'
import { DASHBOARD } from '../_routes'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEnd,
} from '../sharedStyles/styles.layout'
import { h2, titleInvertedClrTxt } from '../sharedStyles/styles.typography'
import IdentitySetupSubstep from '../components/IdentitySetupSubstep'
import { setPublicIdentity, setIdentity } from '../redux/actions'
import { TAppState } from '../redux/reducers'
import WithIntroBackground from '../components/WithIntroBackground'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { saveIdentityAsContactInDemoServices } from '../services/service.demo'
import {
  setIdentityEncrypted,
  promptUserAndGetIdentityDecrypted,
} from '../services/service.keychain'
import { createIdentity } from '../utils/utils.identity'
import { MNEMONIC } from '../_routeParameters'
import { delay } from '../utils/utils.async'

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

const STEPS_DESCRIPTIONS = [
  'Creating your identity',
  'Saving your identity',
  'Securing your wallet: identify yourself',
]

const STEP_DURATION_MS = 1100
const BUFFER_MS = 100

const getStateForIdx = (idx: number, stepIdx: number): AsyncStatus => {
  if (idx === stepIdx) {
    return AsyncStatus.Pending
  } else if (idx < stepIdx) {
    return AsyncStatus.Success
  } else {
    return AsyncStatus.NotStarted
  }
}

const getStateForStepIdx = (stepIdx: number): AsyncStatus[] =>
  [...Array(3).keys()].map(k => getStateForIdx(k, stepIdx))

const delayAndCall = (idx, cb): Promise<void> => {
  return delay(BUFFER_MS * (idx < 0 ? 1 : 0) + STEP_DURATION_MS).then(() =>
    cb()
  )
}

class IdentitySetup extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    isNextBtnDisabled: true,
    stepStatuses: getStateForStepIdx(-1),
  }

  componentDidUpdate(prevProps: Props): void {
    const { publicIdentityFromStore } = this.props
    if (
      prevProps.publicIdentityFromStore !== publicIdentityFromStore &&
      publicIdentityFromStore !== null
    ) {
      this.setState({
        stepStatuses: getStateForStepIdx(3),
        // the button is enabled only if all steps were successful
        isNextBtnDisabled: false,
      })
    }
  }

  async componentDidMount(): Promise<void> {
    const {
      navigation,
      setPublicIdentityInStore,
      setIdentityInStore,
      usernameFromStore,
    } = this.props
    const mnemonic: string = navigation.getParam(MNEMONIC)
    const identity = createIdentity(mnemonic)
    const publicIdentity = new PublicIdentity(
      identity.address,
      identity.boxPublicKeyAsHex
    )

    if (identity && publicIdentity) {
      await delayAndCall(0, () =>
        this.setState({
          stepStatuses: getStateForStepIdx(0),
        })
      )
      await delayAndCall(1, () =>
        this.setState({
          stepStatuses: getStateForStepIdx(1),
        })
      )
      await delayAndCall(2, () =>
        this.setState({
          stepStatuses: getStateForStepIdx(2),
        })
      )

      await delayAndCall(3, async () => {
        await setIdentityEncrypted(identity)
        const identityDecrypted = await promptUserAndGetIdentityDecrypted()
        if (identityDecrypted) {
          setPublicIdentityInStore(publicIdentity)
          setIdentityInStore(identityDecrypted)
        }
        await saveIdentityAsContactInDemoServices(
          publicIdentity,
          usernameFromStore
        )
      })
    }
  }

  render(): React.ReactNode {
    const { navigation } = this.props
    const { isNextBtnDisabled, stepStatuses } = this.state
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[h2, titleInvertedClrTxt]}>
              Step 3: Knitting your KILT account together
            </Text>
          </View>
          <View style={sectionContainer}>
            {STEPS_DESCRIPTIONS.map((description, idx) => (
              <View key={description.substring(0, 4)} style={sectionContainer}>
                <IdentitySetupSubstep
                  description={description}
                  status={stepStatuses[idx]}
                />
              </View>
            ))}
          </View>
          <View style={sectionContainer}>
            <View style={flexRowEnd}>
              <KiltButton
                disabled={isNextBtnDisabled}
                title="Next >"
                onPress={() => navigation.navigate(DASHBOARD)}
              />
            </View>
          </View>
        </View>
      </WithIntroBackground>
    )
  }
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
