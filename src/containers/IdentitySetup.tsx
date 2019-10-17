import React from 'react'
import { View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
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
import { sectionTitleTxt } from '../sharedStyles/styles.typography'
import IdentitySetupStep from '../components/IdentitySetupStep'
import { storeIdentity } from '../services/service.identity'
import { callWithDelay } from '../utils/utils.async'

const STEP_CREATE = 'create'
const STEP_SAVE = 'save'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  stepDescriptions: object
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

  createIdentity = (mnemonic: string) =>
    Kilt.Identity.buildFromMnemonic(mnemonic)

  async componentDidMount(): Promise<void> {
    const mnemonic: string = this.props.navigation.getParam('mnemonic')
    const identity: any = await callWithDelay(this.createIdentity, [mnemonic])
    if (identity) {
      this.setState(prevState => ({
        ...prevState,
        stepStatuses: {
          [STEP_CREATE]: AsyncStatus.Success,
          [STEP_SAVE]: AsyncStatus.Pending,
        },
      }))
    }
    const id = await callWithDelay(storeIdentity, [identity])
    console.log('identity', id)
    this.setState(prevState => ({
      ...prevState,
      stepStatuses: {
        [STEP_CREATE]: AsyncStatus.Success,
        [STEP_SAVE]: AsyncStatus.Success,
      },
      isNextBtnDisabled: false,
    }))
  }

  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    const { stepDescriptions } = this.props
    const { isNextBtnDisabled } = this.state
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>
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
        {/* button is enabled only if all steps were successful */}
        <View style={sectionContainer}>
          <View style={flexRowEndLayout}>
            <KiltButton
              disabled={isNextBtnDisabled}
              title="Next >"
              onPress={() => navigate(HOME)}
            />
          </View>
        </View>
      </View>
    )
  }
}

IdentitySetup.defaultProps = {
  stepDescriptions: {
    [STEP_CREATE]: 'Creating your identity',
    [STEP_SAVE]: 'Saving your identity',
  },
}

export default IdentitySetup
