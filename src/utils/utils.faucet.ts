import { IPublicIdentity } from '@kiltprotocol/sdk-js'

export const BASE_URL = 'https://faucet.kilt.io/'

export const getRequestTokensUrl = (
  address: IPublicIdentity['address'],
): string => `${BASE_URL}?${address}`
