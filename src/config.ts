import { CType } from '@kiltprotocol/sdk-js'

const cType = require('./data/ctype.json')

const CONFIG = Object.freeze({
  CONNECT: {
    BLOCKCHAIN_NODE: 'wss://full-nodes.kilt.io:9944',
    MESSAGING_SERVICE_URL_FALLBACK: 'https://services.kilt.io:443/messaging',
    CLAIMER_SERVICE_ADDRESS_DEFAULT: 'https://services.kilt.io:443/messaging',
    CONTACTS_SERVICE_URL: 'https://services.kilt.io:443/contacts',
    POLLING_PERIOD_MESSAGES_MS: 3000,
    POLLING_PERIOD_CHAIN_MS: 8000,
  },
  CLAIM: {
    CTYPE: CType.fromSchema(cType),
    // display name: used in the Dashboard as a title for each claim card
    CLAIM_CARD_TITLE: 'Claim',
  },
  THEME: {
    // primary: used for buttons, selection highlight and contacts
    CLR_PRIMARY: '#f05a28',
    CLR_PRIMARY_LIGHT: 'rgba(240,90,40,0.09)',
    // secondary: used for tab navigation, QR code and contacts
    CLR_SECONDARY: '#280021',
    CLR_SECONDARY_DARK: '#751869',
    // logo and more
    LOGO_HORIZONTAL_WIDTH: 320,
    LOGO_HORIZONTAL_HEIGHT: 148,
    SYMBOL_SERVICE_ADDRESS: '📭',
  },
})

export default CONFIG
export const CONFIG_THEME = CONFIG.THEME
export const CONFIG_CONNECT = CONFIG.CONNECT
export const CONFIG_CLAIM = CONFIG.CLAIM
