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

export const fullWidthAndHeight = {
  height: '100%',
  width: '100%',
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

export const flexRowLayoutBaseline: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
}

export const flexRowLayoutSpaceBetween: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

// todo remove "layout" from all names
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
