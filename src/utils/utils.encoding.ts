import { PublicIdentity, IPublicIdentity } from '@kiltprotocol/sdk-js'
import { TPublicIdentityEncoded } from '../types'

const decodePublicIdentity = (
  publicIdentityEncoded: TPublicIdentityEncoded
): PublicIdentity => ({
  address: publicIdentityEncoded.a,
  boxPublicKeyAsHex: publicIdentityEncoded.b,
  serviceAddress: publicIdentityEncoded.s,
})

const encodePublicIdentity = (
  publicIdentity: IPublicIdentity
): TPublicIdentityEncoded => ({
  a: publicIdentity.address,
  b: publicIdentity.boxPublicKeyAsHex,
  ...(publicIdentity.serviceAddress
    ? { s: publicIdentity.serviceAddress }
    : {}),
})

export { encodePublicIdentity, decodePublicIdentity }
