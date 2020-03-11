import { TextStyle } from 'react-native'
import {
  CLR_TXT,
  CLR_TXT_STANDOUT,
  CLR_TXT_INVERTED,
  CLR_TXT_INVERTED_LIGHT_STANDOUT,
  CLR_TXT_INVERTED_LIGHT,
  CLR_SUCCESS,
  CLR_ERROR,
  CLR_TXT_LIGHT,
} from './styles.consts.colors'
import { TXT_S_SIZE, TXT_M_SIZE, TXT_L_SIZE } from './styles.consts.typography'
import { CONFIG_THEME } from '../config'

/* ---------------------------------- */
/*           Titles + Body            */
/* ---------------------------------- */

export const h1: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_L_SIZE,
  fontWeight: '600',
  marginBottom: 6,
  color: CLR_TXT_STANDOUT,
  letterSpacing: 2,
  textTransform: 'uppercase',
}

export const h2: TextStyle = {
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

/* ---------------------------------- */
/*             Text sizes             */
/* ---------------------------------- */

export const mTxt: TextStyle = {
  fontSize: TXT_M_SIZE,
}

export const lTxt: TextStyle = {
  fontSize: TXT_L_SIZE,
}

/* ---------------------------------- */
/*              Layout                */
/* ---------------------------------- */

export const txtCentered: TextStyle = {
  textAlign: 'center',
}

export const txtRight: TextStyle = {
  textAlign: 'right',
}

/* ---------------------------------- */
/*       Color and special text       */
/* ---------------------------------- */

export const boldTxt: TextStyle = {
  fontWeight: '900',
}

export const disabledTxt: TextStyle = {
  color: 'grey',
}

export const emptyStateBodyTxt: TextStyle = {
  ...bodyTxt,
  ...txtCentered,
  color: CLR_TXT_LIGHT,
}

export const bodyEmphasizedTxt: TextStyle = {
  fontSize: TXT_M_SIZE,
  fontWeight: '400',
  color: CONFIG_THEME.CLR_PRIMARY,
  backgroundColor: CONFIG_THEME.CLR_PRIMARY_LIGHT,
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
  color: CONFIG_THEME.CLR_PRIMARY,
}

export const monospaceTxt: TextStyle = {
  // use a monospace font to ensure consistent length of the address display
  fontFamily: 'Courier',
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
  color: CONFIG_THEME.CLR_PRIMARY,
}
