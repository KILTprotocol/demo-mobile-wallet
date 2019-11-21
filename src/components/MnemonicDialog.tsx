import React from 'react'
import Dialog from 'react-native-dialog'
import { dialogContainer } from '../sharedStyles/styles.dialog'

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  visible: boolean
}

const MnemonicDialog: React.FunctionComponent<Props> = ({
  onPressCancel,
  onPressOK,
  visible,
}): JSX.Element => (
  <Dialog.Container visible={visible} style={dialogContainer}>
    <Dialog.Title>Already wrote it down?</Dialog.Title>
    <Dialog.Description>
      This is important! Your identity phrase (seed) will help you recover your
      KILT coins if you lose your wallet.
    </Dialog.Description>
    <Dialog.Button onPress={onPressCancel} label="Cancel" />
    <Dialog.Button onPress={onPressOK} label="Yes, Continue" />
  </Dialog.Container>
)

export default MnemonicDialog
