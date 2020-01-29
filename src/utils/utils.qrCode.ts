import { PublicIdentity } from '@kiltprotocol/sdk-js'

type TEncodedPublicIdentity = {
  a: string
  b: string
  s: string
}

const decodePublicIdentity = (
  publicIdentity: TEncodedPublicIdentity
): PublicIdentity => ({
  address: publicIdentity.a,
  boxPublicKeyAsHex: publicIdentity.b,
  serviceAddress: publicIdentity.s,
})

export { decodePublicIdentity }
