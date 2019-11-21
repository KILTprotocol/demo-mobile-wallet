import React from 'react'
import Dialog from 'react-native-dialog'
import { dialogContainer } from '../sharedStyles/styles.dialog'
import { capitalizeFirstLetter } from '../utils/utils.formatting'

const ctype = require('../data/ctypeMembership.json')
const claimPpties = Object.keys(ctype.metadata.properties)

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  onChangeText: (inputValue: string, ppty: string) => void
  visible: boolean
}

class AddClaimDialog extends React.Component<Props> {
  state = {
    // TODOprio set state as relevant apply styles to disabled btn
    isCreateBtnDisabled: false,
  }

  render(): JSX.Element {
    const { isCreateBtnDisabled } = this.state
    const { onPressOK, onPressCancel, onChangeText, visible } = this.props
    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Request membership card</Dialog.Title>
        {claimPpties.map(ppty => (
          <Dialog.Input
            // todo here adapt keyboardType to input type
            key={ppty}
            returnKeyType="done"
            label={`${capitalizeFirstLetter(ppty)}:`}
            onChangeText={inputValue => onChangeText(inputValue, ppty)}
          />
        ))}
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onPressOK}
          label="Create & Request attestation"
          disabled={isCreateBtnDisabled}
        />
      </Dialog.Container>
    )
  }
}

export default AddClaimDialog
