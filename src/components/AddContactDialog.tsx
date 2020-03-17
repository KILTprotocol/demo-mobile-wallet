import React from 'react'
import Dialog from 'react-native-dialog'
import { View, Text } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { dialogContainer, dialogSection } from '../sharedStyles/styles.dialog'
import Address from './Address'
import QrCodeScanner from './QrCodeScanner'
import StyledTextInput from './StyledTextInput'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { labelTxt } from '../sharedStyles/styles.form'

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
      <Text style={[bodyTxt, labelTxt]}>Name:</Text>
      <StyledTextInput
        autoFocus
        returnKeyType="done"
        onChangeText={name => onChangeContactName(name)}
        // don't spellcheck/autocorrect since it's a name
        spellCheck={false}
        autoCorrect={false}
      />
    </View>
    <View style={dialogSection}>
      <Text style={[bodyTxt, labelTxt]}>Public identity:</Text>
      <View>
        {publicIdentity ? (
          <Address address={publicIdentity.address} />
        ) : (
          <QrCodeScanner
            onBarCodeRead={barcode => {
              onNewContactPublicIdentityRead(barcode.data)
            }}
          />
        )}
      </View>
    </View>
    <Dialog.Button onPress={onPressCancel} label="Cancel" />
    <Dialog.Button
      onPress={onConfirmAddContact}
      label="Add contact"
      disabled={isOkBtnDisabled}
    />
  </Dialog.Container>
)

export default AddContactDialog
