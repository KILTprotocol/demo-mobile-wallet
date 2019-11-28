import React from 'react'
import Dialog from 'react-native-dialog'
import { bodyTxt, disabledTxt } from '../sharedStyles/styles.typography'
import { KILT_ORANGE_CLR } from '../sharedStyles/styles.consts.colors'
import { capitalizeFirstLetter } from '../utils/utils.formatting'

type Props = {
  onChangeText: (inputValue: string, ppty: string) => void
  ppty: string
  username: string
}

/* 
for convenience and simplicity in this demo app:
any ppty that looks like name will be filled with the USERNAME stored in the redux store;
ofc this stops working when using a cType with multiple name-like properties
*/
const isName = (ppty: string): boolean => ppty.toLowerCase().includes('name')
const isEditable = (ppty: string): boolean => !isName(ppty)

const ClaimPptyInput: React.FunctionComponent<Props> = ({
  ppty,
  onChangeText,
  username,
}): JSX.Element => (
  <Dialog.Input
    // todo here adapt keyboardType to input type
    key={ppty}
    returnKeyType="done"
    label={`${capitalizeFirstLetter(ppty)}:`}
    editable={isEditable(ppty)}
    onChangeText={inputValue => onChangeText(inputValue, ppty)}
    style={isEditable(ppty) ? bodyTxt : [bodyTxt, disabledTxt]}
    defaultValue={isName(ppty) ? username : ''}
    selectionColor={KILT_ORANGE_CLR}
  />
)

export default ClaimPptyInput
