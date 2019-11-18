import React from 'react'
import Dialog from 'react-native-dialog'
import { dialogContainer } from '../sharedStyles/styles.dialog'

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  onChangeContactName: (name: string) => void
  visible: boolean
  address: string
}

// todo rename dialog components
class AddContactDialog extends React.Component<Props> {
  state = {
    // TODO set state as relevant apply styles to disabled btn
    isCreateBtnDisabled: false,
  }

  render(): JSX.Element {
    const { isCreateBtnDisabled } = this.state
    const {
      onPressOK,
      onPressCancel,
      onChangeContactName,
      visible,
      address,
    } = this.props
    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Create contact</Dialog.Title>
        <Dialog.Description>{`Address: ${address}`}</Dialog.Description>
        <Dialog.Input
          autoFocus
          returnKeyType="done"
          label="Name:"
          onChangeText={name => onChangeContactName(name)}
        />
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onPressOK}
          label="Create contact"
          disabled={isCreateBtnDisabled}
        />
      </Dialog.Container>
    )
  }
}

export default AddContactDialog
