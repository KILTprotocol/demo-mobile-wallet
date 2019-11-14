const BASE_URL = 'https://faucet.kilt.io/'

const getRequestTokensUrl = (address: string): string =>
  `${BASE_URL}?${address}`

export { getRequestTokensUrl }
