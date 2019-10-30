import { Claim, Identity, RequestForAttestation } from '@kiltprotocol/sdk-js'

export type DriversLicenseClaimContents = {
  name: string
  birthday: number
  type: string
}

function createDriversLicenseClaim(
  claimContents: DriversLicenseClaimContents,
  claimerIdentity: Identity | null
): Claim | null {
  if (claimerIdentity) {
    const ctype = require('../data/ctypeDriversLicense.json')
    return new Claim(ctype, claimContents, claimerIdentity)
  }
  return null
}

function createRequestForAttestation(
  claim: Claim,
  claimerIdentity: Identity | null
): RequestForAttestation | null {
  if (claimerIdentity) {
    // TODO check w Timo. fromObject, but deprecated... ?
    const id = Identity.buildFromSeed(Object.values(claimerIdentity.seed))
    return new RequestForAttestation(claim, [], id)
  }
  return null
}

export { createDriversLicenseClaim, createRequestForAttestation }
