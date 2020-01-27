import {
  Claim,
  Identity,
  RequestForAttestation,
  MessageBodyType,
  Attestation,
  PublicIdentity,
} from '@kiltprotocol/sdk-js'
import { TClaimContents } from '../_types'
import { fromStoredIdentity } from '../utils/utils.identity'
import { singleSend } from './service.messaging'

const CTYPE = require('../data/ctype.json')

function createClaim(
  claimContents: TClaimContents,
  claimerIdentity: Identity | null
): Claim | null {
  if (claimerIdentity) {
    return new Claim(CTYPE, claimContents, claimerIdentity)
  }
  return null
}

function createRequestForAttestation(
  claim: Claim,
  claimerIdentity: Identity | null
): RequestForAttestation | null {
  if (claimerIdentity) {
    const identity = fromStoredIdentity(claimerIdentity)
    return new RequestForAttestation(claim, [], identity)
  }
  return null
}

async function sendRequestForAttestation(
  requestForAttestation: RequestForAttestation,
  claimerIdentity: Identity,
  attesterIdentity: PublicIdentity
): Promise<void> {
  const sender = {
    identity: claimerIdentity,
    metaData: {
      name: '',
    },
    phrase: '',
  }
  const receiver = {
    metaData: {
      name: '',
    },
    publicIdentity: attesterIdentity,
  }
  await singleSend(
    {
      content: requestForAttestation,
      type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
    },
    sender,
    receiver
  )
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
  return attestation
    ? // workaround
      attestation.cTypeHash !==
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
  sendRequestForAttestation,
  queryAttestationByHash,
  checkAttestationExistsOnChain,
}
