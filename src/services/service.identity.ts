import { storeDataUnencrypted, getDataUnencrypted } from './service.storage'

const IDENTITY_KEY = 'identity'

async function storeIdentity(identity): Promise<void> {
  // TODO: only save if idenity not present
  storeDataUnencrypted(IDENTITY_KEY, JSON.stringify(identity))
  return identity
}

async function getIdentity(): Promise<object | null> {
  const identity = await getDataUnencrypted(IDENTITY_KEY)
  return identity ? JSON.parse(identity) : null
}

export { getIdentity, storeIdentity }
