import React from 'react'
import { PulseIndicator } from 'react-native-indicators'
import { LoadingIndicatorSize } from '../_enums'
import { CLR_PRIMARY } from '../_custom/theme'

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
}): JSX.Element => <PulseIndicator color={CLR_PRIMARY} size={getSize(size)} />

export default LoadingIndicator
