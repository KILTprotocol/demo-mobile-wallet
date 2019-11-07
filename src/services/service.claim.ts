import {
  Claim,
  Identity,
  RequestForAttestation,
  MessageBodyType,
} from '@kiltprotocol/sdk-js'
import MessageService from './service.messaging'
import { ATTESTER_MNEMONIC } from '../_config'
import { TDriversLicenseClaimContents } from '../_types'

const ATTESTER_IDENTITY = Identity.buildFromMnemonic(ATTESTER_MNEMONIC)

function createDriversLicenseClaim(
  claimContents: TDriversLicenseClaimContents,
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
    // TODO fromObject also OK, but deprecated soon
    const arr = new Uint8Array(Object.values(claimerIdentity.seed))
    const identity = Identity.buildFromSeed(arr)
    return new RequestForAttestation(claim, [], identity)
  }
  return null
}

function sendRequestForAttestation(
  requestForAttestation: RequestForAttestation,
  identity: Identity
): void {
  const sender = {
    identity,
    // TODO add name
    metaData: {
      name: '',
    },
    // TODO why phrase
    phrase: '',
  }
  const receiver = {
    // TODO why metaData
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
  createDriversLicenseClaim,
  createRequestForAttestation,
  sendRequestForAttestation,
}
