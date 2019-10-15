import React from 'react'
import { View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import * as Keychain from 'react-native-keychain'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import KiltButton from '../sharedComponents/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEndLayout,
} from '../sharedStyles/utils.layout'
import { sectionTitleTxt } from '../sharedStyles/utils.typography'
import IdentitySetupStep from './IdentitySetupStep'
import { AsyncStatus } from '../enums'
import { HOME } from '../routes'

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
        status: AsyncStatus.Pending,
      },
      save: {
        description: 'Saving your identity',
        status: AsyncStatus.NotStarted,
      },
    },
  }

  async asyncFunc(): Promise<void> {
    const username = 'zuck'
    const password = 'poniesRgr8'

    // Store the credentials
    // const can = Keychain.canImplyAuthentication({
    //   authenticationType:
    //     Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    // })

    // console.log('can', can)

    const stored = await Keychain.setGenericPassword('hdccddi', 'there', {
      accessControl: Keychain.ACCESS_CONTROL.DEVICE_PASSCODE,
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      service: 'org.reactjs.native.example.KILTDemoMobileWallet',
    })
    console.log('stored', stored)
    const credentials = await Keychain.getGenericPassword({
      authenticationPrompt: 'heyyyy',
      service: 'org.reactjs.native.example.KILTDemoMobileWallet',
    })
    console.log('credentials', credentials)

    // try {
    //   // Retrieve the credentials
    //   const credentials = await Keychain.getGenericPassword()
    //   if (credentials) {
    //     console.log(
    //       'Credentials successfully loaded for user ' + credentials.username
    //     )
    //     console.log('credentials', credentials)
    //   } else {
    //     console.log('No credentials stored')
    //   }
    // } catch (error) {
    //   console.log("Keychain couldn't be accessed!", error)
    // }
    // const resetted = await Keychain.resetGenericPassword()
    // console.log('resetted', resetted)
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
            status: AsyncStatus.Success,
          },
          save: {
            ...prevState.steps.save,
            status: AsyncStatus.Pending,
          },
        },
        isNextBtnDisabled: false,
      }))
    }

    this.asyncFunc()
    console.log(identity)

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
