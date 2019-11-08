import React from 'react'
import Dialog from 'react-native-dialog'
const ctype = require('../data/ctypeDriversLicense.json')
const driversLicenseProperties = Object.keys(ctype.metadata.properties)

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  onChangeText: (inputValue: string, ppty: string) => void
  visible: boolean
}

class CredentialsDialog extends React.Component<Props> {
  state = {
    // TODO set state as relevant apply styles to disabled btn
    isCreateBtnDisabled: false,
  }

  render(): JSX.Element {
    const { isCreateBtnDisabled } = this.state
    const { onPressOK, onPressCancel, onChangeText, visible } = this.props
    return (
      <Dialog.Container visible={visible}>
        <Dialog.Title>Request credential</Dialog.Title>
        <Dialog.Description>
          Enter the requested information.
        </Dialog.Description>
        {driversLicenseProperties.map(ppty => (
          <Dialog.Input
            label={ppty}
            key={ppty}
            onChangeText={inputValue => onChangeText(inputValue, ppty)}
          />
        ))}
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onPressOK}
          label="Request credential"
          disabled={isCreateBtnDisabled}
        />
      </Dialog.Container>
    )
  }
}

export default CredentialsDialog
