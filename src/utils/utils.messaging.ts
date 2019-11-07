import { MESSAGING_INBOX_URL } from '../_config'

const getInboxUrlFromAddress = (address: string): string =>
  `${MESSAGING_INBOX_URL}/${address}`

// TODO unify function styles
export { getInboxUrlFromAddress }
