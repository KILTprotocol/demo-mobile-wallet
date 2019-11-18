import { PublicIdentity } from '@kiltprotocol/sdk-js'
import BN from 'bn.js'
import { updateBalance } from '../redux/actions'
import { store } from '../redux/store'

const KILT_MICRO_COIN = 1000000

// todo cleanup
// async function getBalanceRaw(address: IPublicIdentity['address']): Promise<BN> {
//   await Kilt.default.connect(BLOCKCHAIN_NODE)
//   const balance = await Balance.getBalance(address)
//   BlockchainApiConnection.getCached().then(blockchain => {
//     blockchain.api.disconnect()
//   })
//   return balance
// }

// async function getBalanceInKiltCoins(
//   address: IPublicIdentity['address']
// ): Promise<number> {
//   // const balanceRaw = await getBalanceRaw(address)
//   // return asKiltCoins(balanceRaw)
// }

// todo number vs balance....
// todo cleanup
function asMicroKiltCoins(balance: number): BN {
  return new BN(balance).muln(KILT_MICRO_COIN)
}

function asKiltCoins(balance: BN): number {
  return balance.divn(KILT_MICRO_COIN).toNumber()
}

function balanceListener(
  address: PublicIdentity['address'],
  balance: BN,
  change: BN
): void {
  if (change.toNumber()) {
    console.info(
      `[BALANCE] Balance has changed by ${change.toNumber()} to ${balance.toNumber()}`
    )
    // save new balance in store
    store.dispatch(updateBalance(asKiltCoins(balance)))
  }
}

export { asKiltCoins, asMicroKiltCoins, balanceListener }
