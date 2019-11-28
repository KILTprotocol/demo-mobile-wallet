import React from 'react'
import Dialog from 'react-native-dialog'
import { dialogContainer } from '../sharedStyles/styles.dialog'
import ClaimPptyInput from './ClaimPptyInput'
import { disabledButton } from '../sharedStyles/styles.buttons'

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  onChangeText: (inputValue: string, ppty: string) => void
  visible: boolean
  username: string
  isOkBtnDisabled: boolean
  claimPpties: string[]
  claimContentsDefault: any
}

class AddClaimDialog extends React.Component<Props> {
  // TODOprio set state as relevant apply styles to disabled btn

  render(): JSX.Element {
    const {
      onPressOK,
      onPressCancel,
      onChangeText,
      visible,
      username,
      isOkBtnDisabled,
      claimPpties,
      claimContentsDefault,
    } = this.props
    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Request membership card</Dialog.Title>
        {claimPpties.map(ppty => (
          // todo refactor since username shouldnt need to be passed to each claimppty input
          <ClaimPptyInput
            key={ppty}
            ppty={ppty}
            username={username}
            onChangeText={inputValue => onChangeText(inputValue, ppty)}
            defaultValue={claimContentsDefault[ppty]}
          />
        ))}
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onPressOK}
          label="Create &  Request"
          disabled={isOkBtnDisabled}
          style={isOkBtnDisabled ? disabledButton : {}}
        />
      </Dialog.Container>
    )
  }
}

export default AddClaimDialog
