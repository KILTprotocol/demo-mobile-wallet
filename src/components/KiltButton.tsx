import React from 'react'
import { Button } from 'react-native'
import { CLR_DANGER } from '../sharedStyles/styles.consts.colors'
import { ButtonType } from '../_enums'
import { CLR_PRIMARY } from '../_custom/theme'

type Props = {
  title: string
  onPress: () => void
  disabled?: boolean
  type?: ButtonType
}

const KiltButton: React.FunctionComponent<Props> = (props): JSX.Element => (
  <Button
    {...props}
    color={props.type === ButtonType.Danger ? CLR_DANGER : CLR_PRIMARY}
  />
)

export default KiltButton
