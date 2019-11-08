import React from 'react'
import { View, Text } from 'react-native'
import { Dispatch } from 'redux'
import { Identity, PublicIdentity } from '@kiltprotocol/sdk-js'
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
import { setIdentity, setPublicIdentity } from '../redux/actions'
import { connect } from 'react-redux'
import { TAppState } from '../redux/reducers'
import WithIntroBackground from '../components/WithIntroBackground'
import { TMapDispatchToProps } from '../_types'

const STEP_CREATE = 'create'
const STEP_SAVE = 'save'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  stepDescriptions: object
  setIdentityInStore: typeof setIdentity
  setPublicIdentityInStore: typeof setPublicIdentity
  identityFromStore: Identity | null
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

  createIdentity = (mnemonic: string) => Identity.buildFromMnemonic(mnemonic)

  componentDidUpdate(prevProps: Props): void {
    const { identityFromStore } = this.props
    if (
      prevProps.identityFromStore !== identityFromStore &&
      identityFromStore !== null
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
      setIdentityInStore,
      setPublicIdentityInStore,
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
      // TODO: handle error case
      await callWithDelay(setIdentityInStore, [identity])
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
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    setIdentityInStore: identity => {
      dispatch(setIdentity(identity))
    },
    setPublicIdentityInStore: publicIdentity => {
      dispatch(setPublicIdentity(publicIdentity))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentitySetup)
