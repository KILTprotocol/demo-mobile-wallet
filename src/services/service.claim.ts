import {
  Claim,
  Identity,
  RequestForAttestation,
  Attestation,
  IClaim,
} from '@kiltprotocol/sdk-js'
import { TClaimContents } from '../types'
import { fromStoredIdentity } from '../utils/utils.identity'
import { CONFIG_CLAIM } from '../config'

function createClaim(
  claimContents: TClaimContents,
  claimerAddress: Identity['address'] | null
): Claim | null {
  const cType = CONFIG_CLAIM.CTYPE
  if (claimerAddress && cType) {
    return new Claim({
      cTypeHash: cType.hash,
      contents: claimContents,
      owner: claimerAddress,
    })
  }
  return null
}

function createRequestForAttestation(
  claim: IClaim,
  storedClaimerIdentity: Identity | null
): RequestForAttestation | null {
  if (storedClaimerIdentity) {
    const claimerIdentity = fromStoredIdentity(storedClaimerIdentity)
    return RequestForAttestation.fromClaimAndIdentity(
      claim,
      claimerIdentity,
      [],
      null
    )
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
  // workaround, TODO fix once the SDK includes a fix for this!
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
