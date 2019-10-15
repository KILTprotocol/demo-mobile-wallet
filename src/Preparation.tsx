import React from 'react'
import { View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import KiltButton from './KiltButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEndLayout,
} from './styles/utils.layout'
import { sectionTitleTxt } from './styles/utils.typography'
import PreparationStep from './PreparationStep'
import { StepStatus } from './enums'
import { HOME } from './routes'

type Props = {
  navigation: any
}
type State = {
  steps: any
  isNextBtnDisabled: boolean
}

class Preparation extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    isNextBtnDisabled: true,
    steps: {
      create: {
        description: 'Creating your identity',
        status: StepStatus.Pending,
      },
      save: {
        description: 'Saving your identity',
        status: StepStatus.NotStarted,
      },
    },
  }

  createIdentity = (mnemonic: string) =>
    Kilt.Identity.buildFromMnemonic(mnemonic)

  createIdentityAsync = (mnemonic: string) =>
    new Promise(resolve =>
      setTimeout(() => resolve(this.createIdentity(mnemonic)), 2000)
    )

  saveIdentity() {
    console.log('saving...')
  }

  async componentDidMount(): Promise<void> {
    const mnemonic = this.props.navigation.getParam('mnemonic')
    const identity = await this.createIdentityAsync(mnemonic)
    if (identity) {
      this.setState(prevState => ({
        steps: {
          create: {
            ...prevState.steps.create,
            status: StepStatus.Success,
          },
          save: {
            ...prevState.steps.save,
            status: StepStatus.Pending,
          },
        },
        isNextBtnDisabled: false,
      }))
    }
    // console.log(identity)

    // const blockchain = await Kilt.default.connect(
    //   'wss://full-nodes.kilt.io:9944'
    // )
    // console.log(blockchain)
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
          <View style={sectionContainer}>
            <PreparationStep
              description={step.description}
              status={step.status}
            />
          </View>
        ))}
        {/* enabled only if all steps were successful */}
        <View style={flexRowEndLayout}>
          <KiltButton
            disabled={isNextBtnDisabled}
            title="Next >"
            onPress={() => navigate(HOME)}
          />
        </View>
      </View>
    )
  }
}

export default Preparation
