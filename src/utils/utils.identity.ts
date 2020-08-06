import { Identity } from '@kiltprotocol/sdk-js'

const fromStoredIdentity = async (identity: Identity): Promise<Identity> => {
  const arr = new Uint8Array(Object.values(identity.seed))
  return Identity.buildFromSeed(arr)
}

const createIdentity = async (mnemonic: string): Promise<Identity> =>
  Identity.buildFromMnemonic(mnemonic)

export { createIdentity, fromStoredIdentity }
