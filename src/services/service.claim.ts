import { Claim, Identity, RequestForAttestation } from '@kiltprotocol/sdk-js'

type DriversLicenseClaimContents = {
  name: string
  birthday: number
  type: string
}

function createDriversLicenseClaim(
  claimContents: DriversLicenseClaimContents,
  claimerIdentity: Identity
): Claim {
  const ctype = require('../data/ctypeDriversLicense.json')
  return new Claim(ctype, claimContents, claimerIdentity)
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
