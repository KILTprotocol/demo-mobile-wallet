import React from 'react'
import { View, Text } from 'react-native'
import { Identity } from '@kiltprotocol/sdk-js'
import {
  bodyTxt,
  h2,
  titleInvertedClrTxt,
  bodyInvertedClrTxt,
} from '../sharedStyles/styles.typography'
import {
  flexRowEnd,
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import { IDENTITY_SETUP } from '../routes'
import MnemonicDialog from '../components/MnemonicDialog'
import MnemonicDisplay from '../components/MnemonicDisplay'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import KiltButton from '../components/KiltButton'
import WithIntroBackground from '../components/WithIntroBackground'
import { MNEMONIC } from '../routeParameters'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
  mnemonic: string
  isDialogVisible: boolean
}

class MnemonicCreation extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    mnemonic: Identity.generateMnemonic(),
    isDialogVisible: false,
  }

  componentWillUnmount(): void {
    this.closeDialog()
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({ isDialogVisible: true })
  }

  render(): JSX.Element {
    const { navigation } = this.props
    const { mnemonic, isDialogVisible } = this.state
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[h2, titleInvertedClrTxt]}>
              Step 2: Your identity phrase (= seed)
            </Text>
            <MnemonicDisplay mnemonic={mnemonic} />
          </View>
          <View style={sectionContainer}>
            <Text style={[bodyTxt, bodyInvertedClrTxt]}>
              This is your KILT identity phrase. Write it down (the order is
              important) and keep it safe and secret. Do not upload it online
              nor share it with anyone.
            </Text>
          </View>
          <View style={sectionContainer}>
            <View style={flexRowEnd}>
              <KiltButton
                title="OK, I wrote it down >"
                onPress={() => {
                  this.openDialog()
                }}
              />
            </View>
          </View>
          <MnemonicDialog
            visible={isDialogVisible}
            onPressCancel={() => this.closeDialog()}
            onPressOK={() => {
              this.closeDialog()
              navigation.navigate(IDENTITY_SETUP, {
                [MNEMONIC]: mnemonic,
              })
            }}
          />
        </View>
      </WithIntroBackground>
    )
  }
}

export default MnemonicCreation
