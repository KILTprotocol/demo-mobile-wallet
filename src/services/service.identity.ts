import { storeDataUnencrypted, getDataUnencrypted } from './service.storage'

const IDENTITY_KEY = 'identity'

async function storeIdentity(identity): Promise<void> {
  return storeDataUnencrypted(IDENTITY_KEY, JSON.stringify(identity))
}

async function getIdentity(): Promise<void> {
  const identity = await getDataUnencrypted(IDENTITY_KEY)
  return JSON.parse(identity)
}

export { getIdentity, storeIdentity }
