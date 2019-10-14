import React from 'react'
import { View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import { mainViewContainer, sectionContainer } from './styles/utils.layout'
import { sectionTitleTxt } from './styles/utils.typography'
import { Button } from 'react-native'
import PreparationStep from './PreparationStep'
import { StepStatus } from './enums'

type Props = {
  navigation: any
}
type State = {
  steps: any
}

class Preparation extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
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
      }))
    }
    // console.log(identity)

    // const blockchain = await Kilt.default.connect(
    //   'wss://full-nodes.kilt.io:9944'
    // )
  }

  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    const { steps } = this.state
    // const mnemonic = this.props.navigation.getParam('mnemonic')
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
        <Button title="Next >" onPress={() => navigate('Home')} />
      </View>
    )
  }
}

export default Preparation
