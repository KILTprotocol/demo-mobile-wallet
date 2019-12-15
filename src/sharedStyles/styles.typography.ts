import {
  CLR_TXT,
  CLR_KILT_0,
  CLR_KILT_0_LIGHT,
  CLR_TXT_STANDOUT,
  CLR_TXT_INVERTED,
  CLR_TXT_INVERTED_LIGHT_STANDOUT,
  CLR_TXT_INVERTED_LIGHT,
  CLR_SUCCESS,
  CLR_ERROR,
} from './styles.consts.colors'
import { TextStyle } from 'react-native'
import { TXT_S_SIZE, TXT_M_SIZE, TXT_L_SIZE } from './styles.consts.typography'

export const mainTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_L_SIZE,
  fontWeight: '600',
  marginBottom: 10,
  color: CLR_TXT_STANDOUT,
  letterSpacing: 2,
  textTransform: 'uppercase',
}

export const sectionTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_M_SIZE,
  fontWeight: '600',
  marginBottom: 12,
  color: CLR_TXT_STANDOUT,
}

export const bodyTxt: TextStyle = {
  fontSize: TXT_S_SIZE,
  fontWeight: '500',
  color: CLR_TXT,
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
  color: CLR_KILT_0,
  backgroundColor: CLR_KILT_0_LIGHT,
  paddingVertical: 2,
  paddingHorizontal: 3,
}

export const titleInvertedClrTxt: TextStyle = {
  color: CLR_TXT_INVERTED_LIGHT_STANDOUT,
}

export const bodyInvertedClrTxt: TextStyle = {
  color: CLR_TXT_INVERTED,
}

export const emphasizedClrTxt: TextStyle = {
  color: CLR_KILT_0,
}

export const txtCentered: TextStyle = {
  textAlign: 'center',
}

/* ---------------------------------- */
/*          Async status text         */
/* ---------------------------------- */

export const txtNotStarted: TextStyle = {
  color: CLR_TXT_INVERTED_LIGHT,
}

export const txtSuccess: TextStyle = {
  color: CLR_SUCCESS,
}

export const txtError: TextStyle = {
  color: CLR_ERROR,
}

export const txtPending: TextStyle = {
  color: CLR_KILT_0,
}
