import { Identity } from '@kiltprotocol/sdk-js'
import { TCredential, THashAndClaimStatus } from './redux/types'

export type TMapDispatchToProps = {
  addCredentialInStore: (credential: TCredential) => void
  updateCredentialStatusInStore: (hashAndStatus: THashAndClaimStatus) => void
  resetIdentityInStore: () => void
  setIdentityInStore: (identity: Identity) => void
  deleteAllCredentialsInStore: (hashAndStatus: THashAndClaimStatus) => void
}

export type TMapStateToProps = {
  identityFromStore: Identity
  credentialsAsObjectFromStore: any
}
