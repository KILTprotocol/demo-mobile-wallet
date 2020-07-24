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
import {
  Identity,
  IMessage,
  MessageBodyType,
  Message,
  AttestedClaim,
  IRequestForAttestation,
} from '@kiltprotocol/sdk-js'
import { ClaimStatus } from '../enums'
import { TAppState } from '../redux/reducers'
import StyledButton from '../components/StyledButton'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import WithDefaultBackground from '../components/WithDefaultBackground'
import { updateClaimStatus, updateClaim, addOldMessage } from '../redux/actions'
import {
  THashAndClaimStatus,
  TClaimMapByHash,
  TMapDispatchToProps,
  TMapStateToProps,
  THashAndClaimStatusAndData,
  IMessageMapById,
} from '../types'
import ClaimList from '../components/ClaimList'
import { NEW_CLAIM } from '../routes'
import { CONFIG_CONNECT } from '../config'
import { fetchAndDecryptNewAttestationMessages } from '../services/service.messaging'
import { h2, h1 } from '../sharedStyles/styles.typography'
import {
  queryAttestationByHash,
  checkAttestationExistsOnChain,
} from '../services/service.claim'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  claimsMapFromStore: TClaimMapByHash
  updateClaimStatusInStore: typeof updateClaimStatus
  updateClaimInStore: typeof updateClaim
  addOldMessageInStore: typeof addOldMessage
  identityFromStore: Identity | null
  oldMessagesFromStore: IMessageMapById
}

class Dashboard extends React.Component<Props> {
  static intervalFetchMessages: number
  static intervalQueryChain: number
  static navigationOptions = {
    header: null,
  }

  async componentDidMount(): Promise<void> {
    Dashboard.intervalFetchMessages = setInterval(
      this.fetchMessagesAndUpdateClaimsInStore,
      CONFIG_CONNECT.POLLING_PERIOD_MESSAGES_MS,
    )
    Dashboard.intervalQueryChain = setInterval(
      this.queryChainAndUpdateClaimsInStore,
      CONFIG_CONNECT.POLLING_PERIOD_CHAIN_MS,
    )
  }

  componentWillUnmount(): void {
    clearInterval(Dashboard.intervalFetchMessages)
    clearInterval(Dashboard.intervalQueryChain)
  }

  queryChainAndUpdateClaimsInStore = async () => {
    const { claimsMapFromStore, updateClaimStatusInStore } = this.props
    const claimHashes = Object.keys(claimsMapFromStore)
    claimHashes.forEach(async h => {
      const attestation = await queryAttestationByHash(h)
      if (attestation && checkAttestationExistsOnChain(attestation)) {
        const hashAndStatus = {
          hash: h,
          status: attestation.revoked ? ClaimStatus.Revoked : ClaimStatus.Valid,
        }
        updateClaimStatusInStore(hashAndStatus)
      } else {
        console.info(
          '[ATTESTATION] Not found on chain aka PENDING',
          attestation,
        )
      }
    })
  }

  fetchMessagesAndUpdateClaimsInStore = async (): Promise<void> => {
    const {
      identityFromStore,
      updateClaimInStore,
      addOldMessageInStore,
      oldMessagesFromStore,
    } = this.props
    const newAttestationMessages = await fetchAndDecryptNewAttestationMessages(
      identityFromStore,
      oldMessagesFromStore,
    )
    newAttestationMessages.forEach(async (message: IMessage) => {
      if (message.body.type === MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM) {
        const { claimHash } = message.body.content.attestation
        const attestation = await queryAttestationByHash(claimHash)
        if (attestation && checkAttestationExistsOnChain(attestation)) {
          console.info('[ATTESTATION] OK found on chain', attestation)
          const hashAndStatusAndData = {
            hash: claimHash,
            status: attestation.revoked
              ? ClaimStatus.Revoked
              : ClaimStatus.Valid,
            attestation: message.body.content.attestation,
          }
          updateClaimInStore(hashAndStatusAndData)
        } else {
          console.info(
            '[ATTESTATION] Not found on chain aka PENDING',
            attestation,
          )
        }
      } else if (
        message.body.type === MessageBodyType.REJECT_ATTESTATION_FOR_CLAIM
      ) {
        // not needed yet with the current version of the demo-client
      }
      addOldMessageInStore(message.messageId)
    })
  }

  render(): JSX.Element {
    const { claimsMapFromStore, navigation } = this.props
    const claims = Object.values(claimsMapFromStore) || []
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={h1}>Dashboard</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={h2}>My claims ({claims.length})</Text>
            <StyledButton
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
  identityFromStore: state.identityReducer.identity,
  claimsMapFromStore: state.claimsReducer.claimsMap,
  oldMessagesFromStore: state.oldMessagesReducer.oldMessages,
})

const mapDispatchToProps = (
  dispatch: Dispatch,
): Partial<TMapDispatchToProps> => ({
  updateClaimInStore: (hashAndStatusAndData: THashAndClaimStatusAndData) => {
    dispatch(updateClaim(hashAndStatusAndData))
  },
  addOldMessageInStore: (messageId: Message['messageId']) => {
    dispatch(addOldMessage(messageId))
  },
  updateClaimStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
    dispatch(updateClaimStatus(hashAndStatus))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
