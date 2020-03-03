import React from 'react'
import { Button } from 'react-native'
import { CLR_DANGER } from '../sharedStyles/styles.consts.colors'
import { ButtonType } from '../enums'
import { CONFIG_THEME } from '../config'

type Props = {
  title: string
  onPress: () => void
  disabled?: boolean
  type?: ButtonType
}

const KiltButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { type } = props
  return (
    <Button
      {...props}
      color={type === ButtonType.Danger ? CLR_DANGER : CONFIG_THEME.CLR_PRIMARY}
    />
  )
}

export default KiltButton
