import React from 'react'
import Dialog from 'react-native-dialog'
import { dialogContainer } from '../sharedStyles/styles.dialog'
import { disabledButton } from '../sharedStyles/styles.buttons'
import ClaimForm from './ClaimForm'
import { NAME, BIRTHDAY, PREMIUM } from '../data/claimProperties'

type Props = {
  onPressCancel: () => void
  onPressOK: () => void
  onChangeValue: (inputValue: any, claimPropertyId: string) => void
  visible: boolean
  username: string
  claimContentsDefault: any
  claimContents: any
}

class AddClaimDialog extends React.Component<Props> {
  // todo change to functional component
  render(): JSX.Element {
    const {
      onPressOK,
      onPressCancel,
      onChangeValue,
      visible,
      claimContentsDefault,
      claimContents,
    } = this.props
    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Request membership card</Dialog.Title>
        <ClaimForm
          nameDefaultValue={claimContentsDefault[NAME]}
          birthdayValueAsNumber={claimContents[BIRTHDAY]}
          premiumValue={claimContents[PREMIUM]}
          onChangeValue={onChangeValue}
        />
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button onPress={onPressOK} label="Create &  Request" />
      </Dialog.Container>
    )
  }
}

export default AddClaimDialog
