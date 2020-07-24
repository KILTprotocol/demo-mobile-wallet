import * as Kilt from '@kiltprotocol/sdk-js'
import { CONFIG_CONNECT } from '../config'
import { balanceListener } from './service.balance'

const { BLOCKCHAIN_NODE } = CONFIG_CONNECT

async function disconnect(): Promise<void> {
  await Kilt.default.disconnect(BLOCKCHAIN_NODE)
  console.info('[SOCKET] Disconnected')
}

async function connectAndListen(
  address: Kilt.IPublicIdentity['address'],
): Promise<void> {
  console.info('[SOCKET] Connecting and listening...')
  await Kilt.default.connect(BLOCKCHAIN_NODE)
  await Kilt.Balance.listenToBalanceChanges(address, balanceListener)
  console.info('[SOCKET] OK connected')
}

export { connectAndListen, disconnect }
