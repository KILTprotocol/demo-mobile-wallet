import React from 'react'
import { PulseIndicator } from 'react-native-indicators'
import { CLR_KILT_0 } from '../sharedStyles/styles.consts.colors'
import { LoadingIndicatorSize } from '../_enums'

const getSize = (size: LoadingIndicatorSize | undefined): number => {
  // todo refactor
  switch (size) {
    case LoadingIndicatorSize.S:
      return 20
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
}): JSX.Element => <PulseIndicator color={CLR_KILT_0} size={getSize(size)} />

export default LoadingIndicator
