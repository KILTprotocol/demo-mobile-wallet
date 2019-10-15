import React from 'react'
import { Button } from 'react-native'
import { KILT_PURPLE_CLR } from './styles/consts.colors'

export default KiltButton = props => (
  <Button {...props} color={KILT_PURPLE_CLR} />
)
