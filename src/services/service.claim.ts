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
  claimerIdentity: Identity
): RequestForAttestation {
  // TODO check w Timo. fronObject, but deprecated... ?
  console.log(claimerIdentity.seed)
  const id = Identity.buildFromSeed(Object.values(claimerIdentity.seed))
  return new RequestForAttestation(claim, [], id)
}

export { createDriversLicenseClaim, createRequestForAttestation }
