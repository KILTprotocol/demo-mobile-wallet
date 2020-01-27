import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import { TAppState } from '../redux/reducers'
import { ClaimStatus } from '../_enums'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import { h2, h1 } from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import {
  queryAttestationByHash,
  checkAttestationExistsOnChain,
} from '../services/service.claim'
import { updateClaimStatus } from '../redux/actions'
import { THashAndClaimStatus, TClaimMapByHash } from '../_types'
import ClaimList from '../components/ClaimList'
import { POLLING_PERIOD_MS } from '../_config'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { NEW_CLAIM } from '../_routes'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  claimsMapFromStore: TClaimMapByHash
  updateClaimStatusInStore: typeof updateClaimStatus
}

class Dashboard extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  }

  static interval: NodeJS.Timeout

  async componentDidMount(): Promise<void> {
    // polling for new messages
    Dashboard.interval = setInterval(
      this.queryChainAndUpdateClaimsInStore,
      POLLING_PERIOD_MS
    )
  }

  queryChainAndUpdateClaimsInStore = async () => {
    const { claimsMapFromStore, updateClaimStatusInStore } = this.props
    const claimHashes = Object.keys(claimsMapFromStore)
    claimHashes.forEach(async h => {
      console.info('[ATTESTATION] Querying hash...')
      const attestation = await queryAttestationByHash(h)
      if (attestation && checkAttestationExistsOnChain(attestation)) {
        console.info(
          '[ATTESTATION] OK found on chain with not 0 ctype hash',
          attestation
        )
        const hashAndStatus = {
          hash: h,
          status: attestation.revoked ? ClaimStatus.Revoked : ClaimStatus.Valid,
        }
        updateClaimStatusInStore(hashAndStatus)
      } else {
        console.info(
          '[ATTESTATION] Not found on chain aka PENDING',
          attestation
        )
      }
    })
  }

  componentWillUnmount(): void {
    clearInterval(Dashboard.interval)
  }

  render(): JSX.Element {
    const { claimsMapFromStore, navigation } = this.props
    const claims = Object.values(claimsMapFromStore)
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={h1}>Dashboard</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={h2}>My claims ({claims.length})</Text>
            <KiltButton
              title="＋ Create claim & request attestation"
              onPress={() => {
                navigation.navigate(NEW_CLAIM)
              }}
            />
          </View>
          <ClaimList claims={claims || []} />
        </ScrollView>
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  claimsMapFromStore: state.claimsReducer.claimsMap,
})

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
      dispatch(updateClaimStatus(hashAndStatus))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
