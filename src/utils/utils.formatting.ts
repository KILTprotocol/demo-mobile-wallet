import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import {
  CLR_PRIMARY,
  CLR_SECONDARY,
  CLR_SECONDARY_DARK,
} from '../_custom/theme'

const COLORS = Object.freeze([CLR_PRIMARY, CLR_SECONDARY, CLR_SECONDARY_DARK])
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
  // last digit of the sum; last is arbitrary, might induces more variablity
  const lastDigit = parseInt(`${sum}`[`${sum}`.length - 1], 10)
  return COLORS[lastDigit % COLORS.length]
}

/* ---------------------------------- */
/*            Shared utils            */
/* ---------------------------------- */

const getFirstCharacter = (str: string): string => `${str.substring(0, 1)}`

export { generateConstantColorFromStr, getFirstCharacter, truncateAddress }
