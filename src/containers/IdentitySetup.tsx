import React from 'react'
import { View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEndLayout,
} from '../sharedStyles/utils.layout'
import { sectionTitleTxt } from '../sharedStyles/utils.typography'
import IdentitySetupStep from '../components/IdentitySetupStep'
import { AsyncStatus } from '../_enums'
import { HOME } from '../_routes'
import { storeIdentity } from '../services/service.identity'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
type State = {
  steps: any
  isNextBtnDisabled: boolean
}

class IdentitySetup extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    isNextBtnDisabled: true,
    steps: {
      create: {
        description: 'Creating your identity',
        status: AsyncStatus.NotStarted,
      },
      save: {
        description: 'Saving your identity',
        status: AsyncStatus.NotStarted,
      },
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
    this.setState(prevState => ({
      steps: {
        create: {
          ...prevState.steps.create,
          status: AsyncStatus.Pending,
        },
        save: {
          ...prevState.steps.save,
          status: AsyncStatus.NotStarted,
        },
      },
    }))
    const mnemonic: string = this.props.navigation.getParam('mnemonic')
    const identity: any = await this.createIdentityAsync(mnemonic)
    if (identity) {
      this.setState(prevState => ({
        steps: {
          create: {
            ...prevState.steps.create,
            status: AsyncStatus.Success,
          },
          save: {
            ...prevState.steps.save,
            status: AsyncStatus.Pending,
          },
        },
      }))
    }
    await this.storeIdentityAsync(identity)
    this.setState(prevState => ({
      steps: {
        create: {
          ...prevState.steps.create,
          status: AsyncStatus.Success,
        },
        save: {
          ...prevState.steps.save,
          status: AsyncStatus.Success,
        },
      },
      isNextBtnDisabled: false,
    }))
  }

  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    const { isNextBtnDisabled, steps } = this.state
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>
            Step 2: Knitting your KILT account together
          </Text>
        </View>
        {Object.values(steps).map(step => (
          <View key={step.description} style={sectionContainer}>
            <IdentitySetupStep
              description={step.description}
              status={step.status}
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

export default IdentitySetup
