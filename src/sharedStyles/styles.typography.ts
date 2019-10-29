import {
  TXT_DEFAULT_CLR,
  KILT_ORANGE_CLR,
  KILT_ORANGE_X_LIGHT_CLR,
  TXT_LIGHT_CLR,
} from './styles.consts.colors'
import { TextStyle } from 'react-native'
import {
  TXT_XS_SIZE,
  TXT_S_SIZE,
  TXT_M_SIZE,
  TXT_L_SIZE,
} from './styles.consts.typography'

export const mainTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_L_SIZE,
  fontWeight: '600',
  marginBottom: 12,
  color: TXT_LIGHT_CLR,
  letterSpacing: 2,
  textTransform: 'uppercase',
}

export const sectionTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_M_SIZE,
  fontWeight: '600',
  marginBottom: 24,
  color: TXT_LIGHT_CLR,
}

export const bodyTxt: TextStyle = {
  fontSize: TXT_S_SIZE,
  fontWeight: '500',
  color: TXT_DEFAULT_CLR,
}

export const bodyEmphasizedTxt: TextStyle = {
  fontSize: TXT_M_SIZE,
  fontWeight: '400',
  color: KILT_ORANGE_CLR,
  backgroundColor: KILT_ORANGE_X_LIGHT_CLR,
  paddingVertical: 2,
  paddingHorizontal: 3,
}
