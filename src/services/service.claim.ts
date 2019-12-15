import {
  Claim,
  Identity,
  RequestForAttestation,
  MessageBodyType,
} from '@kiltprotocol/sdk-js'
import MessageService from './service.messaging'
import { ATTESTER_MNEMONIC } from '../_config'
import { TClaimContents } from '../_types'
import { fromStoredIdentity } from '../utils/utils.identity'

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

function sendRequestForAttestation(
  requestForAttestation: RequestForAttestation,
  identity: Identity
): void {
  // TODO why phrase, why metaData
  const sender = {
    identity,
    // TODO add name
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
  // TODO async and deal with singleSend's errors
  MessageService.singleSend(
    {
      content: requestForAttestation,
      type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
    },
    sender,
    receiver
  )
}

export {
  createMembershipClaim,
  createRequestForAttestation,
  sendRequestForAttestation,
}
