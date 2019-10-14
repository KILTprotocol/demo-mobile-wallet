import {
  TXT_DEFAULT_CLR,
  KILT_ORANGE_CLR,
  KILT_ORANGE_X_LIGHT_CLR,
  KILT_PURPLE_CLR,
} from './consts.colors'

export const mainViewContainer = {
  paddingTop: 48,
  paddingBottom: 24,
  paddingHorizontal: 12,
}

export const mainTitleTxt = {
  fontSize: 32,
  fontWeight: '600',
  marginBottom: 12,
  color: TXT_DEFAULT_CLR,
}

export const sectionTitleTxt = {
  fontSize: 24,
  fontWeight: '600',
  marginBottom: 24,
  color: TXT_DEFAULT_CLR,
}

export const sectionContainer = {
  fontWeight: '600',
  marginTop: 24,
  paddingHorizontal: 24,
}

export const bodyTxt = {
  fontSize: 18,
  fontWeight: '400',
  color: TXT_DEFAULT_CLR,
}

export const bodyEmphasizedTxt = {
  fontSize: 24,
  fontWeight: '400',
  color: KILT_ORANGE_CLR,
  backgroundColor: KILT_ORANGE_X_LIGHT_CLR,
  paddingVertical: 2,
  paddingHorizontal: 3,
}

export const flexRowWrapLayout = {
  flexDirection: 'row',
  flexWrap: 'wrap',
}

export const flexRowLayout = {
  flexDirection: 'row',
  alignItems: 'center',
}

export const btn = {
  backgroundColor: KILT_PURPLE_CLR,
}
