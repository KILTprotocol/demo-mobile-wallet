import React from 'react'
import { View, Text, Button } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'react-native-popup-dialog'
import FadeInView from './FadeInView'
import {
  bodyEmphasizedTxt,
  bodyTxt,
  mainViewContainer,
  sectionContainer,
  sectionTitleTxt,
} from './styles/sharedStyles'
import { flexRowWrapLayout, flexRowEndLayout } from './styles/utils.layout'
import { KILT_PURPLE_CLR } from './styles/consts.colors'

class IdentityCreation extends React.Component<{}, { mnemonic: string }> {
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
    const { mnemonic } = this.state
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>Step 1: your identity</Text>
          <View delay={Math.random() * 100}>
            <View style={flexRowWrapLayout}>
              {mnemonic.split(' ').map(word => (
                <FadeInView delay={Math.random() * 900} duration={1100}>
                  <Text key={word} style={bodyEmphasizedTxt}>
                    {word}
                  </Text>
                </FadeInView>
              ))}
            </View>
          </View>
        </View>
        <View style={sectionContainer}>
          <Text style={bodyTxt}>
            Write this phrase down and keep it safe and secret. This is your
            KILT identity.
          </Text>
        </View>
        <View style={sectionContainer}>
          <View style={flexRowEndLayout}>
            <Button
              title="OK, I wrote it down >"
              onPress={() => {
                this.openDialog()
              }}
              color={KILT_PURPLE_CLR}
            />
          </View>
        </View>

        <Dialog
          visible={this.state.visible}
          style={{ width: 0.8 }}
          dialogTitle={
            <DialogTitle title="Already wrote down your identity phrase?" />
          }
          footer={
            <DialogFooter>
              <DialogButton text="Cancel" onPress={() => this.closeDialog()} />
              <DialogButton
                text="Yes, continue"
                onPress={() => {
                  this.closeDialog()
                  navigate('Preparation', {
                    mnemonic: mnemonic,
                  })
                }}
              />
            </DialogFooter>
          }
          onTouchOutside={() => this.closeDialog()}>
          <DialogContent style={{ width: 240, paddingTop: 24 }}>
            <Text>...</Text>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

export default IdentityCreation
