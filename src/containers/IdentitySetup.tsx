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
} from '../sharedStyles/utils.layout'
import { sectionTitleTxt } from '../sharedStyles/utils.typography'
import IdentitySetupStep from '../components/IdentitySetupStep'
import { storeIdentity } from '../services/service.identity'

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

  createIdentityAsync = (mnemonic: string) =>
    new Promise(resolve =>
      setTimeout(() => resolve(this.createIdentity(mnemonic)), 2000)
    )

  storeIdentityAsync = identity =>
    new Promise(resolve =>
      setTimeout(() => resolve(storeIdentity(identity)), 2000)
    )

  async componentDidMount(): Promise<void> {
    const mnemonic: string = this.props.navigation.getParam('mnemonic')
    const identity: any = await this.createIdentityAsync(mnemonic)
    if (identity) {
      this.setState(prevState => ({
        ...prevState,
        stepStatuses: {
          [STEP_CREATE]: AsyncStatus.Success,
          [STEP_SAVE]: AsyncStatus.Pending,
        },
      }))
    }
    await this.storeIdentityAsync(identity)
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
    const { isNextBtnDisabled, steps } = this.state
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

        {/* enabled only if all steps were successful */}
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
