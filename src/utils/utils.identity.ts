import { Identity } from '@kiltprotocol/sdk-js'

const fromStoredIdentity = (identity: Identity): Identity => {
  const arr = new Uint8Array(Object.values(identity.seed))
  return Identity.buildFromSeed(arr)
}

const createIdentity = (mnemonic: string): Identity =>
  Identity.buildFromMnemonic(mnemonic)

export { createIdentity, fromStoredIdentity }
