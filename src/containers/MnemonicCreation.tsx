import React from 'react'
import { View, Text } from 'react-native'
import { Identity } from '@kiltprotocol/sdk-js'
import {
  bodyTxt,
  sectionTitleTxt,
  titleInvertedClrTxt,
  bodyInvertedClrTxt,
} from '../sharedStyles/styles.typography'
import {
  flexRowEndLayout,
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import { IDENTITY_SETUP } from '../_routes'
import MnemonicDialog from '../components/MnemonicDialog'
import Mnemonic from '../components/Mnemonic'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import KiltButton from '../components/KiltButton'
import WithIntroBackground from '../components/WithIntroBackground'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
  mnemonic: string
  dialogVisible: boolean
}

class MnemonicCreation extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    mnemonic: Identity.generateMnemonic(),
    dialogVisible: false,
  }

  componentWillUnmount(): void {
    this.closeDialog()
  }

  closeDialog(): void {
    this.setState({ dialogVisible: false })
  }

  openDialog(): void {
    this.setState({ dialogVisible: true })
  }

  render(): JSX.Element {
    const { navigation } = this.props
    const { mnemonic, dialogVisible } = this.state
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[sectionTitleTxt, titleInvertedClrTxt]}>
              Step 1: Your identity phrase (= seed)
            </Text>
            <Mnemonic mnemonic={mnemonic} />
          </View>
          <View style={sectionContainer}>
            <Text style={[bodyTxt, bodyInvertedClrTxt]}>
              This is your KILT identity phrase. Write it down (the order is
              important) and keep it safe and secret. Do not upload it online
              nor share it with anyone.
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
            visible={dialogVisible}
            onPressCancel={() => this.closeDialog()}
            onPressOK={() => {
              this.closeDialog()
              navigation.navigate(IDENTITY_SETUP, {
                mnemonic,
              })
            }}
          />
        </View>
      </WithIntroBackground>
    )
  }
}

export default MnemonicCreation
