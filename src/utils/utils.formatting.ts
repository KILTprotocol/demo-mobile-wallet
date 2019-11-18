import {
  KILT_ORANGE_CLR,
  KILT_PURPLE_CLR,
  KILT_GREEN_CLR,
} from '../sharedStyles/styles.consts.colors'

const ADDRESS_DISPLAY_LENGTH = 10
const COLORS = Object.freeze([KILT_ORANGE_CLR, KILT_PURPLE_CLR, KILT_GREEN_CLR])

const truncateAddress = (address: string): string =>
  `${address.substr(0, ADDRESS_DISPLAY_LENGTH)}...`

const takeFirstLetter = (str: string): string => `${str.substring(0, 1)}`

/* generates a color from a string that will be different for different strings
but always the same for a given string
useful e.g. to generate a color for an address, that will be the same for 2
different users adding the same contact (better for UX), but likely different for 2 different addresses */
const generateConstantColor = (address: string): string => {
  // sum all character codes
  const sum = address.split('').reduce((acc, c, idx) => {
    return acc + address.charCodeAt(idx)
  }, 0)
  // get last digit (that's arbitrary)
  const lastDigit = parseInt(`${sum}`[`${sum}`.length - 1], 10)
  return COLORS[lastDigit % COLORS.length]
}

export { generateConstantColor, takeFirstLetter, truncateAddress }
