import { ViewStyle } from 'react-native'

export const picker: ViewStyle = {
  transform: [{ translateY: -10 }],
}

export const sPicker = {
  ...picker,
  height: 100,
}

export const lPicker = {
  ...picker,
  height: 200,
}
