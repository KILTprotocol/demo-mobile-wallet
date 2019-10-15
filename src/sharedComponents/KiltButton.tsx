import React from 'react'
import { Button } from 'react-native'
import { KILT_PURPLE_CLR } from '../sharedStyles/consts.colors'

const KiltButton: React.FunctionComponent = (props): JSX.Element => (
  <Button {...props} color={KILT_PURPLE_CLR} />
)

export default KiltButton
