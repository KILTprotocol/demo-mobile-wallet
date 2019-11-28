import React from 'react'
import Dialog from 'react-native-dialog'
import { bodyTxt, disabledTxt } from '../sharedStyles/styles.typography'
import { KILT_ORANGE_CLR } from '../sharedStyles/styles.consts.colors'
import { capitalizeFirstLetter } from '../utils/utils.formatting'

type Props = {
  onChangeText: (inputValue: string, ppty: string) => void
  ppty: string
  username: string
  defaultValue: string
}

const ClaimPptyInput: React.FunctionComponent<Props> = ({
  ppty,
  onChangeText,
  defaultValue,
}): JSX.Element => (
  <Dialog.Input
    // todo here adapt keyboardType to input type
    key={ppty}
    returnKeyType="done"
    label={`${capitalizeFirstLetter(ppty)}:`}
    // editable only if no default value is in
    editable={!defaultValue}
    onChangeText={inputValue => onChangeText(inputValue, ppty)}
    style={defaultValue ? [bodyTxt, disabledTxt] : bodyTxt}
    defaultValue={defaultValue}
    selectionColor={KILT_ORANGE_CLR}
  />
)

export default ClaimPptyInput
