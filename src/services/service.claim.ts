import {
  Claim,
  Identity,
  RequestForAttestation,
  MessageBodyType,
  Attestation,
} from '@kiltprotocol/sdk-js'
import { ATTESTER_MNEMONIC } from '../_config'
import { TClaimContents } from '../_types'
import { fromStoredIdentity } from '../utils/utils.identity'
import { singleSend } from './service.messaging'

const ATTESTER_IDENTITY = Identity.buildFromMnemonic(ATTESTER_MNEMONIC)

function createMembershipClaim(
  claimContents: TClaimContents,
  claimerIdentity: Identity | null
): Claim | null {
  if (claimerIdentity) {
    const ctype = require('../data/ctypeMembership.json')
    return new Claim(ctype, claimContents, claimerIdentity)
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
  identity: Identity
): Promise<void> {
  const sender = {
    identity,
    metaData: {
      name: '',
    },
    phrase: '',
  }
  const receiver = {
    metaData: {
      name: '',
    },
    publicIdentity: ATTESTER_IDENTITY,
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
  createMembershipClaim,
  createRequestForAttestation,
  formatDateForClaim,
  sendRequestForAttestation,
  queryAttestationByHash,
  checkAttestationExistsOnChain,
}
