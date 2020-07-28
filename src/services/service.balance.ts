import { PublicIdentity, Balance, IPublicIdentity } from '@kiltprotocol/sdk-js'
import BN from 'bn.js'
import { updateBalance } from '../redux/actions'
import { store } from '../redux/store'

const KILT_MICRO_COIN = 1000000
const KILT_FEMTO_COIN = 1000000000000000

async function getBalanceRaw(address: IPublicIdentity['address']): Promise<BN> {
  const balance = await Balance.getBalance(address)
  return balance
}

function asMicroKiltCoins(balance: number): BN {
  return new BN(balance).muln(KILT_MICRO_COIN)
}

function asKiltCoins(balance: BN): number {
  return balance.div(new BN(KILT_FEMTO_COIN)).toNumber()
}

function asFemtoKilt(balance: number): BN {
  return new BN(balance).mul(new BN(KILT_FEMTO_COIN))
}

async function getBalanceInKiltCoins(
  address: IPublicIdentity['address'],
): Promise<number> {
  const balanceRaw = await getBalanceRaw(address)
  return asKiltCoins(balanceRaw)
}

function balanceListener(
  address: PublicIdentity['address'],
  balance: BN,
  change: BN,
): void {
  if (!change.isZero()) {
    console.info(
      `[BALANCE LISTENER] Balance has changed by ${change} to ${balance}`,
    )
    // save new balance in store
    store.dispatch(updateBalance(asKiltCoins(balance)))
  }
}

export {
  asKiltCoins,
  asMicroKiltCoins,
  balanceListener,
  getBalanceInKiltCoins,
  asFemtoKilt,
}
