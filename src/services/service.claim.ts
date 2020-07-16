import {
  Claim,
  Identity,
  RequestForAttestation,
  Attestation,
  IClaim,
  PublicIdentity,
} from '@kiltprotocol/sdk-js'
import { CONFIG_CLAIM } from '../config'

function createClaim(
  claimContents: IClaim['contents'],
  claimerAddress: PublicIdentity['address'] | null
): Claim | null {
  const cType = CONFIG_CLAIM.CTYPE
  if (claimerAddress && cType) {
    return Claim.fromCTypeAndClaimContents(
      cType,
      claimContents,
      claimerAddress,
    )
  }
  return null
}

async function createRequestForAttestation(
  claim: IClaim,
  claimerIdentity: Identity | null
): Promise<RequestForAttestation | null> {
  if (claimerIdentity) {
    const {message: request} = await RequestForAttestation.fromClaimAndIdentity(
      claim,
      claimerIdentity,
    )
    return request
  }
  return null
}

async function queryAttestationByHash(
  hash: string
): Promise<Attestation | null> {
  const attestation = await Attestation.query(hash)
  return attestation
}

function checkAttestationExistsOnChain(
  attestation: Attestation | null
): boolean {
  // ⚠️ workaround, TODO fix once the SDK includes a fix for this!
  return attestation
    ? attestation.cTypeHash !==
        '0x0000000000000000000000000000000000000000000000000000000000000000'
    : false
}

export {
  createClaim,
  createRequestForAttestation,
  queryAttestationByHash,
  checkAttestationExistsOnChain,
}
