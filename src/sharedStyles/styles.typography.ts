import {
  TXT_DEFAULT_CLR,
  KILT_ORANGE_CLR,
  KILT_ORANGE_X_LIGHT_CLR,
  TXT_LIGHT_CLR,
  TXT_INVERTED_CLR,
  TXT_INVERTED_LIGHT_CLR_NEUTRAL,
  TXT_INVERTED_LIGHT_CLR,
  SUCCESS_CLR,
  ERROR_CLR,
} from './styles.consts.colors'
import { TextStyle } from 'react-native'
import { TXT_S_SIZE, TXT_M_SIZE, TXT_L_SIZE } from './styles.consts.typography'

export const mainTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_L_SIZE,
  fontWeight: '600',
  marginBottom: 10,
  color: TXT_LIGHT_CLR,
  letterSpacing: 2,
  textTransform: 'uppercase',
}

export const sectionTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_M_SIZE,
  fontWeight: '600',
  marginBottom: 12,
  color: TXT_LIGHT_CLR,
}

export const bodyTxt: TextStyle = {
  fontSize: TXT_S_SIZE,
  fontWeight: '500',
  color: TXT_DEFAULT_CLR,
}

export const inputTxt = bodyTxt

export const mTxt: TextStyle = {
  fontSize: TXT_M_SIZE,
}

export const lTxt: TextStyle = {
  fontSize: TXT_L_SIZE,
}

export const boldTxt: TextStyle = {
  fontWeight: '900',
}

export const disabledTxt: TextStyle = {
  color: 'grey',
}

export const bodyEmphasizedTxt: TextStyle = {
  fontSize: TXT_M_SIZE,
  fontWeight: '400',
  color: KILT_ORANGE_CLR,
  backgroundColor: KILT_ORANGE_X_LIGHT_CLR,
  paddingVertical: 2,
  paddingHorizontal: 3,
}

export const titleInvertedClrTxt: TextStyle = {
  color: TXT_INVERTED_LIGHT_CLR_NEUTRAL,
}

export const bodyInvertedClrTxt: TextStyle = {
  color: TXT_INVERTED_CLR,
}

export const emphasizedClrTxt: TextStyle = {
  color: KILT_ORANGE_CLR,
}

export const txtCentered: TextStyle = {
  textAlign: 'center',
}

export const txtNotStarted: TextStyle = {
  color: TXT_INVERTED_LIGHT_CLR,
}

export const txtSuccess: TextStyle = {
  color: SUCCESS_CLR,
}

export const txtError: TextStyle = {
  color: ERROR_CLR,
}

export const txtPending: TextStyle = {
  color: KILT_ORANGE_CLR,
}
