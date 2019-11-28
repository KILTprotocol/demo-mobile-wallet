const ATTESTER_MNEMONIC =
  'snake rabbit relief hotel naive quiz chicken square office identify obscure tired'
// 5FVqnXPPCTBKtkJMvBnifLiXFfXhNQnxh7xSmmYmXx7J1zux
const BLOCKCHAIN_NODE = 'wss://full-nodes.kilt.io:9944'
const MESSAGING_SERVICE_URL = 'https://services.kilt.io:443/messaging'
const CONTACTS_SERVICE_URL = 'https://services.kilt.io:443/contacts'
const MESSAGING_INBOX_URL = `${MESSAGING_SERVICE_URL}/inbox`
const POLLING_PERIOD_MS = 3000
// CLAIMER_DISPLAY_NAME is used when saving the identity in the demo services, for demo purposes
// In case you're wondering, I picked Glenn because Glenn is a Scottish name and... we're Kilt... see what I did here
// todoprio ask at setup
// todo ok if empty????

export {
  ATTESTER_MNEMONIC,
  BLOCKCHAIN_NODE,
  MESSAGING_INBOX_URL,
  MESSAGING_SERVICE_URL,
  CONTACTS_SERVICE_URL,
  POLLING_PERIOD_MS,
}
