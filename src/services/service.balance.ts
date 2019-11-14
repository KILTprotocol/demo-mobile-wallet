import { Balance, IPublicIdentity } from '@kiltprotocol/sdk-js'
import * as Kilt from '@kiltprotocol/sdk-js'
import { BlockchainApiConnection } from '@kiltprotocol/sdk-js'
import BN from 'bn.js'
import { BLOCKCHAIN_NODE } from '../_config'

const KILT_MICRO_COIN = 1000000

async function getBalanceRaw(address: IPublicIdentity['address']): Promise<BN> {
  await Kilt.default.connect(BLOCKCHAIN_NODE)
  const balance = await Balance.getBalance(address)
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
