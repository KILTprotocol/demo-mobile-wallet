import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Identity } from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
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
  paddedBottomS,
} from '../sharedStyles/styles.layout'
import { IDENTITY_SETUP } from '../routes'
import MnemonicDialog from './MnemonicDialog'
import Mnemonic from './Mnemonic'
import KiltButton from './KiltButton'
import WithIntroBackground from './WithIntroBackground'
import MNEMONIC from '../routeParameters'
import StyledSegmentedControl from './StyledSegmentedControl'
import StyledTextInput from './StyledTextInput'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

type State = {
  mnemonic: string
  isDialogVisible: boolean
  useNew: boolean
}

const MNEMONIC_METHODS = ['Create new identity', 'Use existing identity']

class MnemonicCreation extends React.Component<Props, State> {
  state = {
    isDialogVisible: false,
    mnemonic: MnemonicCreation.newMnemonic,
    useNew: true,
  }

  componentWillUnmount(): void {
    this.closeDialog()
  }

  onInputMnemonic(txt: string): void {
    this.setState({ mnemonic: txt })
  }

  static navigationOptions = {
    header: null,
  }

  static newMnemonic = Identity.generateMnemonic()

  openDialog(): void {
    this.setState({ isDialogVisible: true })
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  render(): JSX.Element {
    const { navigation } = this.props
    const { mnemonic, isDialogVisible, useNew } = this.state
    return (
      <WithIntroBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[h2, titleInvertedClrTxt]}>
              Step 2: Your identity phrase (= seed)
            </Text>
            <StyledSegmentedControl
              values={MNEMONIC_METHODS}
              selectedIndex={useNew ? 0 : 1}
              onChange={event => {
                this.setState({
                  useNew: event.nativeEvent.selectedSegmentIndex === 0,
                  mnemonic: useNew ? '' : MnemonicCreation.newMnemonic,
                })
              }}
            />
            <View style={sectionContainer} />
            {useNew ? (
              <>
                <View style={paddedBottomS}>
                  <Mnemonic mnemonic={MnemonicCreation.newMnemonic} />
                </View>
                <Text style={[bodyTxt, bodyInvertedClrTxt]}>
                  This is your KILT identity phrase. Write it down (the order is
                  important) and keep it safe and secret. Do not upload it
                  online nor share it with anyone.
                </Text>
              </>
            ) : (
              <StyledTextInput
                autoFocus
                returnKeyType="done"
                multiline={true}
                numberOfLines={3}
                maxLength={80}
                inverted
                extraStyle={{ height: 80 }}
                onChangeText={txt => this.onInputMnemonic(txt)}
              />
            )}
          </View>
          <View style={sectionContainer}>
            <View style={flexRowEnd}>
              <KiltButton
                disabled={mnemonic.trim().length <= 0}
                title="Next >"
                onPress={() => {
                  if (useNew) {
                    this.openDialog()
                  } else {
                    navigation.navigate(IDENTITY_SETUP, {
                      [MNEMONIC]: mnemonic,
                    })
                  }
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
