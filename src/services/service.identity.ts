import { storeDataUnencrypted, getDataUnencrypted } from './service.storage'

const IDENTITY_KEY = 'identity'

async function storeIdentity(identity): Promise<object | null> {
  // only store if no identity is present yet to prevent overwriting identity
  if (!getIdentity()) {
    storeDataUnencrypted(IDENTITY_KEY, JSON.stringify(identity))
    return identity
  }
  return null
}

async function getIdentity(): Promise<object | null> {
  const identity = await getDataUnencrypted(IDENTITY_KEY)
  return identity ? JSON.parse(identity) : null
}

export { getIdentity, storeIdentity }
