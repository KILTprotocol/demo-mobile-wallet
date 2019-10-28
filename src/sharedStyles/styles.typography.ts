import {
  TXT_DEFAULT_CLR,
  KILT_ORANGE_CLR,
  KILT_ORANGE_X_LIGHT_CLR,
} from './styles.consts.colors'
import { TextStyle } from 'react-native'

export const mainTitleTxt: TextStyle = {
  fontSize: 30,
  fontWeight: '600',
  marginBottom: 12,
  color: TXT_DEFAULT_CLR,
}

export const sectionTitleTxt: TextStyle = {
  fontSize: 24,
  fontWeight: '600',
  marginBottom: 24,
  color: TXT_DEFAULT_CLR,
}

export const bodyTxt: TextStyle = {
  fontSize: 18,
  fontWeight: '400',
  color: TXT_DEFAULT_CLR,
}

export const bodyEmphasizedTxt: TextStyle = {
  fontSize: 24,
  fontWeight: '400',
  color: KILT_ORANGE_CLR,
  backgroundColor: KILT_ORANGE_X_LIGHT_CLR,
  paddingVertical: 2,
  paddingHorizontal: 3,
}
