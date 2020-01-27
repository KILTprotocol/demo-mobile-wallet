import { ViewStyle } from 'react-native'

/* ---------------------------------- */
/*             Containers             */
/* ---------------------------------- */

export const mainViewContainer: ViewStyle = {
  paddingHorizontal: 18,
  marginTop: 24,
}

export const sectionContainer: ViewStyle = {
  marginBottom: 32,
  paddingHorizontal: 12,
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
