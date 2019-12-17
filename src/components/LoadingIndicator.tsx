import React from 'react'
import { PulseIndicator } from 'react-native-indicators'
import { CLR_KILT_0 } from '../sharedStyles/styles.consts.colors'
import { LoadingIndicatorSize } from '../_enums'

const SIZE_DEFAULT = 40
const sizes = {
  [LoadingIndicatorSize.S]: 20,
  [LoadingIndicatorSize.M]: 40,
  [LoadingIndicatorSize.L]: 60,
}

const getSize = (size: LoadingIndicatorSize | undefined): number =>
  size ? sizes[size] || SIZE_DEFAULT : SIZE_DEFAULT

type Props = {
  size?: LoadingIndicatorSize
}

const LoadingIndicator: React.FunctionComponent<Props> = ({
  size,
}): JSX.Element => <PulseIndicator color={CLR_KILT_0} size={getSize(size)} />

export default LoadingIndicator
