const BLOCKCHAIN_NODE = 'wss://full-nodes.kilt.io:9944'
const MESSAGING_SERVICE_URL = 'https://services.kilt.io:443/messaging'
const CONTACTS_SERVICE_URL = 'https://services.kilt.io:443/contacts'
const MESSAGING_INBOX_URL = `${MESSAGING_SERVICE_URL}/inbox`
const POLLING_PERIOD_MS = 3000

const CTYPE = require('./data/ctype.json')
// display name: used in the Dashboard as a title for each claim card
const CLAIMS_TITLE = 'Claim'

export {
  BLOCKCHAIN_NODE,
  MESSAGING_INBOX_URL,
  MESSAGING_SERVICE_URL,
  CONTACTS_SERVICE_URL,
  POLLING_PERIOD_MS,
  CTYPE,
  CLAIMS_TITLE,
}
