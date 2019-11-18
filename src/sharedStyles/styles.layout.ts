import { ViewStyle } from 'react-native'

/* ---------------------------------- */
/*             Containers             */
/* ---------------------------------- */

export const mainViewContainer: ViewStyle = {
  paddingHorizontal: 18,
  paddingBottom: 12,
  paddingTop: 44,
}

export const sectionContainer: ViewStyle = {
  marginBottom: 24,
  paddingHorizontal: 12,
}

export const fixedHeight: ViewStyle = {
  height: 24,
}

/* ---------------------------------- */
/*                Flex                */
/* ---------------------------------- */

export const flexRowWrapLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

export const fullCenter: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
}

export const flexRowLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

export const flexRowLayoutSpaceBetween: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const flexRowCenterLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const flexRowEndLayout: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

/* ---------------------------------- */
/*          Image background          */
/* ---------------------------------- */

export const imgBckgrd = {
  height: '100%',
  width: '100%',
}

/* ---------------------------------- */
/*                Card                */
/* ---------------------------------- */

export const card: ViewStyle = {
  shadowColor: '#000',
  backgroundColor: 'white',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.3,
  shadowRadius: 9,
  elevation: 16,
}

/* ---------------------------------- */
/*       QrCodeScannerContainer       */
/* ---------------------------------- */

export const qrCodeScannerContainer: ViewStyle = {
  height: 200,
}
