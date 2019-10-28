import { ViewStyle } from 'react-native'

// Containers

export const mainViewContainer: ViewStyle = {
  paddingTop: 48,
  paddingBottom: 24,
  paddingHorizontal: 12,
}

export const sectionContainer: ViewStyle = {
  fontWeight: '600',
  marginTop: 24,
  paddingHorizontal: 24,
}

// Flex

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

// Dialog

export const dialog = {
  width: 0.7,
}

export const dialogContent = {
  paddingTop: 24,
}
