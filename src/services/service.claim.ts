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
  const cTypeSchema = CONFIG_CLAIM.CTYPE
  if (claimerAddress && cTypeSchema) {
    return new Claim({
      cTypeHash: cTypeSchema.hash,
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
  // workaround
  return attestation
    ? attestation.cTypeHash !==
        '0x0000000000000000000000000000000000000000000000000000000000000000'
    : false
}

// date --> "2019-02-13" (YYYY-MM-DD)
function formatDateForClaim(inputDate: number): string {
  const date = new Date(inputDate)
  const yy = date.getFullYear()
  const mm = `${`${date.getMonth() + 1}`.length < 2 ? 0 : ''}${date.getMonth() +
    1}`
  const dd = `${`${date.getDate() + 1}`.length < 2 ? 0 : ''}${date.getDate()}`
  return `${yy}-${mm}-${dd}`
}

export {
  createClaim,
  createRequestForAttestation,
  formatDateForClaim,
  queryAttestationByHash,
  checkAttestationExistsOnChain,
}
