import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { CONFIG_THEME } from '../config'

const COLORS = Object.freeze([
  CONFIG_THEME.CLR_PRIMARY,
  CONFIG_THEME.CLR_SECONDARY,
  CONFIG_THEME.CLR_SECONDARY_DARK,
])
const ADDRESS_DISPLAY_START_LENGTH = 4
const ADDRESS_DISPLAY_END_LENGTH = 4

/* ---------------------------------- */
/*               Address              */
/* ---------------------------------- */

const truncateAddress = (
  address: IPublicIdentity['address'],
  startLength = ADDRESS_DISPLAY_START_LENGTH
): string =>
  `${address.substr(0, startLength)}...${address.substr(
    address.length - ADDRESS_DISPLAY_END_LENGTH,
    ADDRESS_DISPLAY_END_LENGTH
  )}`

/* Generates a color from a string that will be different for different strings
but always the same for a given string. Useful to generate a color for an address, that will be the same for 2
different users adding the same contact (better UX), but likely different for 2 different addresses. */
const generateConstantColorFromStr = (str: string): string => {
  const lastCharCode = str.charCodeAt(str.length - 1)
  return COLORS[lastCharCode % COLORS.length]
}

/* ---------------------------------- */
/*                Date                */
/* ---------------------------------- */

// date as number --> "2019-02-13" (YYYY-MM-DD)
function formatDateForClaim(inputDate: number): string {
  const date = new Date(inputDate)
  const yy = date.getFullYear()
  const mm = `${`${date.getMonth() + 1}`.length < 2 ? 0 : ''}${date.getMonth() +
    1}`
  const dd = `${`${date.getDate() + 1}`.length < 2 ? 0 : ''}${date.getDate()}`
  return `${yy}-${mm}-${dd}`
}

/* ---------------------------------- */
/*                Misc                */
/* ---------------------------------- */

const getFirstCharacter = (str: string): string => `${str.substring(0, 1)}`

export {
  formatDateForClaim,
  generateConstantColorFromStr,
  getFirstCharacter,
  truncateAddress,
}
