import React from 'react'
import {
  ViewStyle,
  NativeSyntheticEvent,
  NativeSegmentedControlIOSChangeEvent,
} from 'react-native'
import SegmentedControlIOS from '@react-native-community/segmented-control'
import { CONFIG_THEME } from '../config'

type Props = {
  onChange: (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>
  ) => void
  values: string[]
  selectedIndex: number
}

const style: ViewStyle = {
  height: 44,
  marginTop: 24,
  marginBottom: 12,
  borderRadius: 2,
}

const StyledSegmentedControl: React.FunctionComponent<Props> = ({
  values,
  selectedIndex,
  onChange,
}): JSX.Element => {
  return (
    <SegmentedControlIOS
      tintColor={CONFIG_THEME.CLR_PRIMARY}
      style={style}
      values={values}
      selectedIndex={selectedIndex}
      onChange={onChange}
    />
  )
}

export default StyledSegmentedControl
