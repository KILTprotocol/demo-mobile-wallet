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
  flexDirection: 'row',
  flexWrap: 'wrap',
}

export const fullCenter: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
}

export const flexRowLayout: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

export const flexRowCenterLayout: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const flexRowEndLayout: ViewStyle = {
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
