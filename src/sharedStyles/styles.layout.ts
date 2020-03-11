import { ViewStyle } from 'react-native'

/* ---------------------------------- */
/*              Spacing               */
/* ---------------------------------- */

export const mainViewContainer: ViewStyle = {
  paddingHorizontal: 18,
  paddingTop: 32,
}

export const sectionContainer: ViewStyle = {
  paddingHorizontal: 12,
  marginBottom: 32,
}

export const paddedBottomS: ViewStyle = {
  paddingBottom: 14,
}

export const paddedBottomM: ViewStyle = {
  paddingBottom: 28,
}

export const paddedVerticalM: ViewStyle = {
  paddingVertical: 28,
}

export const paddedTopS: ViewStyle = {
  paddingTop: 14,
}

export const paddedRightXS: ViewStyle = {
  paddingRight: 10,
}

export const paddedVerticalS: ViewStyle = {
  paddingVertical: 14,
}

/* ---------------------------------- */
/*          Height and layout         */
/* ---------------------------------- */

export const fixedHeight: ViewStyle = {
  height: 24,
}

export const fill = {
  height: '100%',
  width: '100%',
}

export const centered: ViewStyle = {
  alignSelf: 'center',
}

/* ---------------------------------- */
/*                Flex                */
/* ---------------------------------- */

export const flexRowWrap: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

export const fillCenter: ViewStyle = {
  ...fill,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const flexRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

export const flexRowStart: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
}

export const flexRowBaseline: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
}

export const flexRowSpaceBetween: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const flexRowCenter: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const flexRowEnd: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

export const flexColumnSpaceBetween: ViewStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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
