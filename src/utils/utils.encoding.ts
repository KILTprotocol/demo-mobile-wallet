import { IPublicIdentity } from '@kiltprotocol/sdk-js'

const encodePublicIdentity = (
  publicIdentity: IPublicIdentity,
): Array<string> => [
  publicIdentity.address,
  publicIdentity.boxPublicKeyAsHex,
  ...(publicIdentity.serviceAddress ? [publicIdentity.serviceAddress] : []),
]

const decodePublicIdentity = (
  publicIdentityEncoded: Array<string>,
): IPublicIdentity => ({
  address: publicIdentityEncoded[0],
  boxPublicKeyAsHex: publicIdentityEncoded[1],
  ...(publicIdentityEncoded[2]
    ? { serviceAddress: publicIdentityEncoded[2] }
    : {}),
})

export { encodePublicIdentity, decodePublicIdentity }
