import React from 'react'
import Dialog from 'react-native-dialog'
import { View, Text } from 'react-native'
import {
  dialogContainer,
  dialogSection,
  formFreeLabel,
} from '../sharedStyles/styles.dialog'
import { qrCodeScannerContainer } from '../sharedStyles/styles.layout'
import AddressDisplay from './AddressDisplay'
import QrCodeScanner from './QrCodeScanner'
import { inputTxt } from '../sharedStyles/styles.typography'
import { CLR_KILT_0 } from '../sharedStyles/styles.consts.colors'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'

type Props = {
  onPressCancel: () => void
  onConfirmAddContact: () => void
  onChangeContactName: (name: string) => void
  onNewContactAddressRead: (address: IPublicIdentity['address']) => void
  visible: boolean
  address: IPublicIdentity['address']
  isOkBtnDisabled: boolean
}

// todo rename dialog components
class AddContactDialog extends React.Component<Props> {
  render(): JSX.Element {
    const {
      onConfirmAddContact,
      onPressCancel,
      onChangeContactName,
      onNewContactAddressRead,
      visible,
      address,
      isOkBtnDisabled,
    } = this.props
    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Add new contact</Dialog.Title>
        <View style={dialogSection}>
          <Text style={formFreeLabel}>New contact address:</Text>
          <View>
            {address ? (
              <AddressDisplay address={address} />
            ) : (
              <View style={qrCodeScannerContainer}>
                <QrCodeScanner
                  onBarCodeRead={barcode => {
                    onNewContactAddressRead(barcode.data)
                  }}
                />
              </View>
            )}
          </View>
        </View>
        <Dialog.Input
          autoFocus
          returnKeyType="done"
          label="Name:"
          onChangeText={name => onChangeContactName(name)}
          // a name shouldn't be spellchecked
          spellCheck={false}
          autoCorrect={false}
          style={inputTxt}
          selectionColor={CLR_KILT_0}
        />
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onConfirmAddContact}
          label="Add contact"
          disabled={isOkBtnDisabled}
        />
      </Dialog.Container>
    )
  }
}

export default AddContactDialog
