import { Balance, IPublicIdentity } from '@kiltprotocol/sdk-js'
import * as Kilt from '@kiltprotocol/sdk-js'
import { BlockchainApiConnection } from '@kiltprotocol/sdk-js'
import BN from 'bn.js'

const KILT_MICRO_COIN = 1000000

async function getBalanceRaw(address: IPublicIdentity['address']): Promise<BN> {
  const connection = await Kilt.default.connect('wss://full-nodes.kilt.io:9944')
  const balance = await Balance.getBalance(address)
  console.log('balance', balance)
  BlockchainApiConnection.getCached().then(blockchain => {
    blockchain.api.disconnect()
  })
  return balance
}

async function getBalanceInKiltCoins(
  address: IPublicIdentity['address']
): Promise<number> {
  const balanceRaw = await getBalanceRaw(address)
  return asKiltCoins(balanceRaw)
}

function asKiltCoins(balance: BN): number {
  return balance.divn(KILT_MICRO_COIN).toNumber()
}

export { getBalanceRaw, getBalanceInKiltCoins }
