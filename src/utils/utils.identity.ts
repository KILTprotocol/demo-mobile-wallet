import { Identity } from '@kiltprotocol/sdk-js'

// TODO this is used a lot, use a selector instead
const fromStoredIdentity = (identity: Identity): Identity => {
  const arr = new Uint8Array(Object.values(identity.seed))
  return Identity.buildFromSeed(arr)
}

const createIdentity = (mnemonic: string): Identity =>
  Identity.buildFromMnemonic(mnemonic)

export { createIdentity, fromStoredIdentity }
