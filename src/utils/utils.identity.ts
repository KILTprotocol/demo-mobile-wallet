import { Identity } from '@kiltprotocol/sdk-js'

// TODO how is it an identity if it's missing some ppties?
const getSdkIdentityFromStoredIdentity = (identity: Identity): Identity => {
  // TODO fix
  const arr = new Uint8Array(Object.values(identity.seed))
  return Identity.buildFromSeed(arr)
}

export { getSdkIdentityFromStoredIdentity }

const x1 = {
  address: '5F5kRYZBreg74o9tdF2TiTdXWP9wagsCkDngvSPLqJpU38bK',
  boxKeyPair: {
    publicKey: {
      '0': 171,
      // ....
    },
  },
  boxPublicKeyAsHex:
    '0xab2f7754e3a3aa8ed3451389ac69c40ece5c1416324dfbabed05ffddbdd9c708',
  seed: {
    '0': 34,
    // ...
  },
  seedAsHex:
    '0x2234be9a01a3a62acbd4bceaa6dfee1d5d47465d8d6c6bf0746ae0e8df4ddacb',
  signKeyringPair: { type: 'ed25519' },
  signPublicKeyAsHex:
    '0x85809623addade17b19139b3e5ce5691b3217f20e55c67b277165cae4555ca3c',
}

const x2 = {
  address: '5F5kRYZBreg74o9tdF2TiTdXWP9wagsCkDngvSPLqJpU38bK',
  boxKeyPair: {
    publicKey: [
      171,
      //...
    ],
    secretKey: [
      252,
      //...
    ],
  },
  boxPublicKeyAsHex:
    '0xab2f7754e3a3aa8ed3451389ac69c40ece5c1416324dfbabed05ffddbdd9c708',
  seed: [
    34,
    //...
  ],
  seedAsHex:
    '0x2234be9a01a3a62acbd4bceaa6dfee1d5d47465d8d6c6bf0746ae0e8df4ddacb',
  serviceAddress: undefined,
  signKeyringPair: {
    address: `[Function address]`,
    decodePkcs8: `[Function decodePkcs8]`,
    encodePkcs8: `[Function encodePkcs8]`,
    getMeta: `[Function getMeta]`,
    isLocked: `[Function isLocked]`,
    lock: `[Function lock]`,
    publicKey: `[Function publicKey]`,
    setMeta: `[Function setMeta]`,
    sign: `[Function sign]`,
    toJson: `[Function toJson]`,
    type: 'ed25519',
    verify: `[Function verify]`,
  },
  signPublicKeyAsHex:
    '0x85809623addade17b19139b3e5ce5691b3217f20e55c67b277165cae4555ca3c',
}
