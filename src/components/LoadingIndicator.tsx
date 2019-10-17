import React from 'react'
import { PulseIndicator } from 'react-native-indicators'
import { KILT_ORANGE_CLR } from '../sharedStyles/styles.consts.colors'

const LoadingIndicator: React.FunctionComponent = (): JSX.Element => (
  <PulseIndicator color={KILT_ORANGE_CLR} />
)

export default LoadingIndicator
