import { storeDataUnencrypted, getDataUnencrypted } from './service.storage'
import { Identity } from '@kiltprotocol/sdk-js'

const IDENTITY_KEY = 'identity'

async function storeIdentity(identity: Identity): Promise<object | null> {
  // only store if no identity is present yet to prevent overwriting identity
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

export { getIdentity, storeIdentity }
