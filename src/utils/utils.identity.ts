import { Identity } from '@kiltprotocol/sdk-js'

// TODO how is it an identity if it's missing some ppties?
const getSDKIdentityFromStoredIdentity = (
  identity: Identity | null
): Identity => {
  // TODO fix
  const arr = new Uint8Array(Object.values(identity.seed))
  return Identity.buildFromSeed(arr)
}

export { getSDKIdentityFromStoredIdentity }
