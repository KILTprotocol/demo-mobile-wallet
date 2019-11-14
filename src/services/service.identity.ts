import {
  storeDataUnencrypted,
  getDataUnencrypted,
  removeDataUnencrypted,
} from './service.storage'
import { Identity } from '@kiltprotocol/sdk-js'

const IDENTITY_KEY = 'identity'

async function storeIdentity(identity: Identity): Promise<object | null> {
  // we only store an identity if no identity is present yet, in order to prevent overwriting identity
  const identityExisting = await getIdentity()
  if (!identityExisting) {
    // TODO: handle error case
    storeDataUnencrypted(IDENTITY_KEY, JSON.stringify(identity))
    return identity
  }
  return null
}

async function getIdentity(): Promise<Identity | null> {
  const identity = await getDataUnencrypted(IDENTITY_KEY)
  return identity ? JSON.parse(identity) : null
}

async function resetIdentity(): Promise<boolean> {
  const removed = await removeDataUnencrypted(IDENTITY_KEY)
  return removed
}

// these exports are not used yet, will be when identity becomes encrypted
export { getIdentity, storeIdentity, resetIdentity }
