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
import { ClaimStatus } from '../enums'
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
import {
  THashAndClaimStatus,
  TClaimMapByHash,
  TMapDispatchToProps,
  TMapStateToProps,
} from '../types'
import ClaimList from '../components/ClaimList'
import { NEW_CLAIM } from '../routes'
import { CONFIG_CONNECT } from '../config'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  claimsMapFromStore: TClaimMapByHash
  updateClaimStatusInStore: typeof updateClaimStatus
}

class Dashboard extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  }

  static interval: number

  async componentDidMount(): Promise<void> {
    // polling for new messages
    Dashboard.interval = setInterval(
      this.queryChainAndUpdateClaimsInStore,
      CONFIG_CONNECT.POLLING_PERIOD_MS
    )
  }

  componentWillUnmount(): void {
    clearInterval(Dashboard.interval)
  }

  queryChainAndUpdateClaimsInStore = async () => {
    const { claimsMapFromStore, updateClaimStatusInStore } = this.props
    const claimHashes = Object.keys(claimsMapFromStore)
    // todo improve/refactor
    claimHashes.forEach(async h => {
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
          <ClaimList claims={claims} navigation={navigation} />
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
): Partial<TMapDispatchToProps> => ({
  updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
    dispatch(updateClaimStatus(hashAndStatus))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
