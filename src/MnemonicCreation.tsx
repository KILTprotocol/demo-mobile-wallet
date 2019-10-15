import React from 'react'
import { View, Text, Button } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import { bodyTxt, sectionTitleTxt } from './styles/utils.typography'
import { sectionContainer } from './styles/utils.layout'
import { flexRowEndLayout } from './styles/utils.layout'
import { mainViewContainer } from './styles/utils.layout'
import { IDENTITY_SETUP } from './routes'
import MnemonicDialog from './MnemonicDialog'
import Mnemonic from './Mnemonic'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import KiltButton from './sharedComponents/KiltButton'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
  mnemonic: string
  visible: boolean
}

class MnemonicCreation extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    mnemonic: Kilt.Identity.generateMnemonic(),
    visible: false,
  }

  componentWillUnmount(): void {
    this.closeDialog()
  }

  closeDialog(): void {
    this.setState({ visible: false })
  }

  openDialog(): void {
    this.setState({ visible: true })
  }

  render(): JSX.Element {
    const { navigate } = this.props.navigation
    const { mnemonic, visible } = this.state
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>Step 1: your identity phrase</Text>
          <Mnemonic mnemonic={mnemonic} />
        </View>
        <View style={sectionContainer}>
          <Text style={bodyTxt}>
            Write this phrase down and keep it safe and secret. This is your
            KILT identity phrase.
          </Text>
        </View>
        <View style={sectionContainer}>
          <View style={flexRowEndLayout}>
            <KiltButton
              title="OK, I wrote it down >"
              onPress={() => {
                this.openDialog()
              }}
            />
          </View>
        </View>
        <MnemonicDialog
          visible={visible}
          onTouchOutside={() => this.closeDialog()}
          onPressCancel={() => this.closeDialog()}
          onPressOK={() => {
            this.closeDialog()
            navigate(IDENTITY_SETUP, {
              mnemonic: mnemonic,
            })
          }}
        />
      </View>
    )
  }
}

export default MnemonicCreation
