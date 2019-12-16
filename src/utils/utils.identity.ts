import { Identity } from '@kiltprotocol/sdk-js'

// TODO how is it an identity if it's missing some properties?
// todo note that this is used a lot; use a selector instead??
const fromStoredIdentity = (identity: Identity): Identity => {
  // TODO fix
  const arr = new Uint8Array(Object.values(identity.seed))
  return Identity.buildFromSeed(arr)
}

const createIdentity = (mnemonic: string): Identity =>
  Identity.buildFromMnemonic(mnemonic)

export { createIdentity, fromStoredIdentity }
