import { MESSAGING_INBOX_URL } from '../_config'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'

const getInboxUrlFromAddress = (address: IPublicIdentity['address']): string =>
  `${MESSAGING_INBOX_URL}/${address}`

// TODO unify function styles
export { getInboxUrlFromAddress }
