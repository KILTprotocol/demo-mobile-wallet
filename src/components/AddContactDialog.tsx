import React from 'react'
import Dialog from 'react-native-dialog'
import { View, Text } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import {
  dialogContainer,
  dialogSection,
  formFreeLabel,
} from '../sharedStyles/styles.dialog'
import Address from './Address'
import QrCodeScanner from './QrCodeScanner'
import { inputTxt } from '../sharedStyles/styles.form'
import { CONFIG_THEME } from '../config'

type Props = {
  onPressCancel: () => void
  onConfirmAddContact: () => void
  onChangeContactName: (name: string) => void
  onNewContactPublicIdentityRead: (address: IPublicIdentity['address']) => void
  visible: boolean
  publicIdentity: IPublicIdentity
  isOkBtnDisabled: boolean
}

const AddContactDialog: React.FunctionComponent<Props> = ({
  onConfirmAddContact,
  onPressCancel,
  onChangeContactName,
  onNewContactPublicIdentityRead,
  visible,
  publicIdentity,
  isOkBtnDisabled,
}): JSX.Element => (
  <Dialog.Container visible={visible} style={dialogContainer}>
    <Dialog.Title>Add new contact</Dialog.Title>
    <View style={dialogSection}>
      <Text style={formFreeLabel}>New contact address:</Text>
      <View>
        {publicIdentity ? (
          <Address address={publicIdentity.address} />
        ) : (
          <QrCodeScanner
            onBarCodeRead={barcode => {
              console.log(barcode)
              onNewContactPublicIdentityRead(barcode.data)
            }}
          />
        )}
      </View>
    </View>
    <Dialog.Input
      autoFocus
      returnKeyType="done"
      label="Name:"
      onChangeText={name => onChangeContactName(name)}
      // don't spellcheck the name
      spellCheck={false}
      autoCorrect={false}
      style={inputTxt}
      selectionColor={CONFIG_THEME.CLR_PRIMARY}
    />
    <Dialog.Button onPress={onPressCancel} label="Cancel" />
    <Dialog.Button
      onPress={onConfirmAddContact}
      label="Add contact"
      disabled={isOkBtnDisabled}
    />
  </Dialog.Container>
)

export default AddContactDialog
