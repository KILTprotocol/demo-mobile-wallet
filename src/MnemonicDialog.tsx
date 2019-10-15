import React from 'react'
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'react-native-popup-dialog'
import { Text } from 'react-native'

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  onTouchOutside: () => void
  visible: boolean
}

const MnemonicDialog: React.FunctionComponent<Props> = ({
  onPressCancel,
  onPressOK,
  onTouchOutside,
  visible,
}): JSX.Element => (
  <Dialog
    visible={visible}
    style={{ width: 0.8 }}
    dialogTitle={
      <DialogTitle title="Already wrote down your identity phrase?" />
    }
    footer={
      <DialogFooter>
        <DialogButton text="Cancel" onPress={onPressCancel} />
        <DialogButton text="Yes, continue" onPress={onPressOK} />
      </DialogFooter>
    }
    onTouchOutside={onTouchOutside}>
    <DialogContent style={{ width: 240, paddingTop: 24 }}>
      <Text>...</Text>
    </DialogContent>
  </Dialog>
)

// onTouchOutside={() => this.closeDialog()}>
// onPressCancel = () => this.closeDialog()
// () => {
// onPressOk
// this.closeDialog()
// navigate(PREPARATION, {
//   mnemonic: mnemonic,
// }

export default MnemonicDialog
