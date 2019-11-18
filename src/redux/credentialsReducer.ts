import {
  ADD_CREDENTIAL,
  DELETE_ALL_CREDENTIALS,
  UPDATE_CREDENTIAL_STATUS,
} from './actionTypes'
import { TAppAction, TCredentialMapByHash } from '../_types'
import { TAppState } from './reducers'

const INITIAL_STATE = {
  credentialsMap: <TCredentialMapByHash>{},
}

// TODO change name of credential, since a credential is only when attested
export default function credentialsReducer(
  state = INITIAL_STATE,
  action: TAppAction
): TAppState {
  switch (action.type) {
    case ADD_CREDENTIAL:
      return {
        ...state,
        credentialsMap: {
          ...state.credentialsMap,
          [action.payload.hash]: action.payload,
        },
      }
    case DELETE_ALL_CREDENTIALS:
      return {
        ...state,
        credentialsMap: {},
      }
    case UPDATE_CREDENTIAL_STATUS:
      console.log(
        '[CREDENTIAL] Updating credential status:',
        action.payload.hash
      )
      const { hash: claimHash, status: claimStatus } = action.payload
      const credentialToUpdate = state.credentialsMap[claimHash]
      return {
        ...state,
        credentialsMap: {
          ...state.credentialsMap,
          // only update the credential if a relevant update msg is sent
          ...(credentialToUpdate && {
            [claimHash]: {
              ...credentialToUpdate,
              status: claimStatus,
            },
          }),
        },
      }
    default:
      return state
  }
}
