import {
  CLR_KILT_0,
  CLR_KILT_1,
  CLR_KILT_2,
  CLR_KILT_1_DARK,
  CLR_KILT_2_DARK,
} from '../sharedStyles/styles.consts.colors'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'

const COLORS = Object.freeze([
  CLR_KILT_0,
  CLR_KILT_1,
  CLR_KILT_1_DARK,
  CLR_KILT_2,
  CLR_KILT_2_DARK,
])
const ADDRESS_DISPLAY_START_LENGTH = 8
const ADDRESS_DISPLAY_END_LENGTH = 4

/* ---------------------------------- */
/*               Address              */
/* ---------------------------------- */

const truncateAddress = (address: IPublicIdentity['address']): string =>
  `${address.substr(0, ADDRESS_DISPLAY_START_LENGTH)}...${address.substr(
    address.length - ADDRESS_DISPLAY_END_LENGTH,
    ADDRESS_DISPLAY_END_LENGTH
  )}`

/* generates a color from a string that will be different for different strings
but always the same for a given string
useful e.g. to generate a color for an address, that will be the same for 2
different users adding the same contact (better for UX), but likely different for 2 different addresses */
const generateConstantColorFromStr = (str: string): string => {
  // sum all character codes of the str
  const sum = str.split('').reduce((acc, c, idx) => {
    return acc + str.charCodeAt(idx)
  }, 0)
  /* get last digit of the sum (last is arbitrary; we could also take the first, but the last induces more variablity since strings might iften have the same length and similar letters) */
  const lastDigit = parseInt(`${sum}`[`${sum}`.length - 1], 10)
  return COLORS[lastDigit % COLORS.length]
}

/* ---------------------------------- */
/*            Shared utils            */
/* ---------------------------------- */

const takeFirstLetter = (str: string): string => `${str.substring(0, 1)}`
const capitalizeFirstLetter = (str: string): string =>
  `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`

export {
  generateConstantColorFromStr,
  takeFirstLetter,
  capitalizeFirstLetter,
  truncateAddress,
}
