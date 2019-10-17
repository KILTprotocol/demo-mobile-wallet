import React from 'react'
import { Button } from 'react-native'
import { KILT_PURPLE_CLR } from '../sharedStyles/styles.consts.colors'

type Props = {
  title: string
  onPress: () => void
  disabled?: boolean
}

const KiltButton: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => <Button {...props} color={KILT_PURPLE_CLR} />

export default KiltButton
