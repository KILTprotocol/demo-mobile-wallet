import { IPublicIdentity } from '@kiltprotocol/sdk-js'

const BASE_URL = 'https://faucet.kilt.io/'

const getRequestTokensUrl = (address: IPublicIdentity['address']): string =>
  `${BASE_URL}?${address}`

export { getRequestTokensUrl }
