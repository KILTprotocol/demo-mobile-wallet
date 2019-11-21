import React from 'react'
import { Button } from 'react-native'
import {
  KILT_ORANGE_CLR,
  DANGER_CLR,
} from '../sharedStyles/styles.consts.colors'
import { ButtonType } from '../_enums'

type Props = {
  title: string
  onPress: () => void
  disabled?: boolean
  type?: ButtonType
}

const KiltButton: React.FunctionComponent<Props> = (props): JSX.Element => (
  <Button
    {...props}
    color={props.type === ButtonType.Danger ? DANGER_CLR : KILT_ORANGE_CLR}
  />
)

export default KiltButton
