import { ViewStyle, TextStyle } from 'react-native'
import { CLR_TXT_MEDIUM, CLR_TXT_X_LIGHT } from './styles.consts.colors'
import { TXT_XS_SIZE, TXT_S_SIZE } from './styles.consts.typography'
import { bodyTxt } from './styles.typography'

export const picker: ViewStyle = {
  transform: [{ translateY: -10 }],
}

export const sPicker: ViewStyle = {
  ...picker,
  height: 120,
}

export const lPicker: ViewStyle = {
  ...picker,
  height: 200,
}

export const input: ViewStyle = {
  width: '100%',
  height: 44,
  borderWidth: 1,
  borderColor: CLR_TXT_X_LIGHT,
  borderRadius: 5,
  padding: 8,
  fontSize: TXT_S_SIZE,
}

export const inputTxt = bodyTxt

export const labelTxt: TextStyle = {
  textTransform: 'capitalize',
  color: CLR_TXT_MEDIUM,
  fontSize: TXT_XS_SIZE,
  paddingBottom: 4,
}
