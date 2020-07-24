import {
  ADD_CLAIM,
  DELETE_ALL_CLAIMS,
  UPDATE_CLAIM_STATUS,
  UPDATE_CLAIM,
} from './actionTypes'
import { TAppAction, TClaimMapByHash } from '../types'
import { TAppState } from './reducers'

const INITIAL_STATE = {
  claimsMap: <TClaimMapByHash>{},
}

export default function claimsReducer(
  state = INITIAL_STATE,
  action: TAppAction,
): TAppState {
  switch (action.type) {
    case ADD_CLAIM:
      return {
        ...state,
        claimsMap: {
          ...state.claimsMap,
          [action.payload.hash]: action.payload,
        },
      }
    case DELETE_ALL_CLAIMS:
      return {
        ...state,
        claimsMap: {},
      }
    case UPDATE_CLAIM: {
      console.info('[CLAIM REDUCER] Updating claim:', action.payload.hash)
      const {
        hash: claimHash,
        status: claimStatus,
        req4Att,
        attestation,
      } = action.payload
      const claimToUpdate = state.claimsMap[claimHash]
      return {
        ...state,
        claimsMap: {
          ...state.claimsMap,
          ...(claimToUpdate && {
            [claimHash]: {
              ...claimToUpdate,
              status: claimStatus,
              req4Att: req4Att ? req4Att : claimToUpdate.req4Att,
              attestation: attestation ? attestation : claimToUpdate.attestation,
            },
          }),
        },
      }
    }
    case UPDATE_CLAIM_STATUS: {
      console.info(
        '[CLAIM REDUCER] Updating claim status:',
        action.payload.hash,
      )
      const { hash: claimHash, status: claimStatus } = action.payload
      const claimToUpdate = state.claimsMap[claimHash]
      return {
        ...state,
        claimsMap: {
          ...state.claimsMap,
          // only update the claim if a relevant update message is sent
          ...(claimToUpdate && {
            [claimHash]: {
              ...claimToUpdate,
              status: claimStatus,
            },
          }),
        },
      }
    }

    default:
      return state
  }
}
