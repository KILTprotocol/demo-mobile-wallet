import React from 'react'
import { PulseIndicator } from 'react-native-indicators'
import { KILT_ORANGE_CLR } from '../sharedStyles/styles.consts.colors'
import { LoadingIndicatorSize } from '../_enums'

const getSize = (size: LoadingIndicatorSize | undefined): number => {
  switch (size) {
    case LoadingIndicatorSize.S:
      return 24
    case LoadingIndicatorSize.M:
      return 40
    case LoadingIndicatorSize.L:
      return 60
    default:
      return 40
  }
}

type Props = {
  size?: LoadingIndicatorSize
}

const LoadingIndicator: React.FunctionComponent<Props> = ({
  size,
}): JSX.Element => (
  <PulseIndicator color={KILT_ORANGE_CLR} size={getSize(size)} />
)

export default LoadingIndicator
