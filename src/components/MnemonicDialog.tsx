import React from 'react'
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'react-native-popup-dialog'
import { Text } from 'react-native'
import { dialog } from '../sharedStyles/styles.layout'
import { dialogContent } from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'

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
    style={dialog}
    dialogTitle={<DialogTitle title="Already wrote it down?" />}
    footer={
      <DialogFooter>
        <DialogButton text="Cancel" onPress={onPressCancel} />
        <DialogButton text="Yes, continue" onPress={onPressOK} />
      </DialogFooter>
    }
    onTouchOutside={onTouchOutside}>
    <DialogContent style={dialogContent}>
      <Text style={bodyTxt}>
        This is important! Your identity phrase (seed) will help you recover
        your KILT coins if you lose your wallet.
      </Text>
    </DialogContent>
  </Dialog>
)

export default MnemonicDialog
