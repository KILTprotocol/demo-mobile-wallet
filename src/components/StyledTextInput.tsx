import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { CONFIG_THEME } from '../config'
import { bodyTxt, bodyInvertedClrTxt } from '../sharedStyles/styles.typography'
import { input } from '../sharedStyles/styles.form'

type Props = TextInputProps & { inverted?: boolean }

const StyledTextInput: React.FunctionComponent<Props> = (
  props,
): JSX.Element => {
  const { inverted } = props
  const style = inverted
    ? [bodyTxt, input, bodyInvertedClrTxt]
    : [bodyTxt, input]
  return (
    <TextInput
      {...props}
      selectionColor={CONFIG_THEME.CLR_PRIMARY}
      style={style}
    />
  )
}

export default StyledTextInput
