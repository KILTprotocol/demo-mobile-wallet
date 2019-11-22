import React from 'react'
import Dialog from 'react-native-dialog'
import { View, Text, ViewStyle } from 'react-native'
import { dialogContainer, dialogSection } from '../sharedStyles/styles.dialog'
import { qrCodeScannerContainer } from '../sharedStyles/styles.layout'
import AddressDisplay from './AddressDisplay'
import QrCodeScanner from './QrCodeScanner'

const newContactLabel: ViewStyle = {
  paddingBottom: 6,
}

type Props = {
  onPressCancel: () => void
  onConfirmAddContact: () => void
  onChangeContactName: (name: string) => void
  onNewContactAddressRead: (address: string) => void
  visible: boolean
  address: string
}

// todo rename dialog components
class AddContactDialog extends React.Component<Props> {
  state = {
    // TODOprio set state as relevant apply styles to disabled btn
    isOKBtnDisabled: false,
  }

  render(): JSX.Element {
    const { isOKBtnDisabled } = this.state
    const {
      onConfirmAddContact,
      onPressCancel,
      onChangeContactName,
      onNewContactAddressRead,
      visible,
      address,
    } = this.props
    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Add new contact</Dialog.Title>
        <View style={dialogSection}>
          <Text style={newContactLabel}>New contact address:</Text>
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
        />
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onConfirmAddContact}
          label="Add contact"
          disabled={isOKBtnDisabled}
        />
      </Dialog.Container>
    )
  }
}

export default AddContactDialog
