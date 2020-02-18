import {
  ADD_CLAIM,
  DELETE_ALL_CLAIMS,
  UPDATE_CLAIM_STATUS,
} from './actionTypes'
import { TAppAction, TClaimMapByHash } from '../types'
import { TAppState } from './reducers'

const INITIAL_STATE = {
  claimsMap: <TClaimMapByHash>{},
}

export default function claimsReducer(
  state = INITIAL_STATE,
  action: TAppAction
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
    case UPDATE_CLAIM_STATUS:
      console.info(
        '[CLAIM REDUCER] Updating claim status:',
        action.payload.hash
      )
      const { hash: claimHash, status: claimStatus } = action.payload
      const claimToUpdate = state.claimsMap[claimHash]
      return {
        ...state,
        claimsMap: {
          ...state.claimsMap,
          // only update the claim if a relevant update msg is sent
          ...(claimToUpdate && {
            [claimHash]: {
              ...claimToUpdate,
              status: claimStatus,
            },
          }),
        },
      }
    default:
      return state
  }
}
