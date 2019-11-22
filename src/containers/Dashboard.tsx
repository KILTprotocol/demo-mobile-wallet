import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Identity, PublicIdentity, Attestation } from '@kiltprotocol/sdk-js'
import { Dispatch } from 'redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import { TAppState } from '../redux/reducers'
import { CredentialStatus } from '../_enums'
import KiltButton from '../components/KiltButton'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import {
  sectionTitleTxt,
  mainTitleTxt,
} from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import AddClaimDialog from '../components/AddClaimDialog'
import {
  createMembershipClaim,
  createRequestForAttestation,
  sendRequestForAttestation,
} from '../services/service.claim'
import { addCredential, updateCredentialStatus } from '../redux/actions'
import {
  TCredential,
  THashAndClaimStatus,
  TClaimContents,
  TCredentialMapByHash,
} from '../_types'
import CredentialList from '../components/CredentialList'
import { POLLING_PERIOD_MS } from '../_config'
import { getSdkIdentityFromStoredIdentity } from '../utils/utils.identity'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  publicIdentityFromStore: PublicIdentity | null
  credentialsMapFromStore: TCredentialMapByHash
  addCredentialInStore: typeof addCredential
  updateCredentialStatusInStore: typeof updateCredentialStatus
}

type State = {
  dialogVisible: boolean
  claimContents: object
}

class Dashboard extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  static interval: NodeJS.Timeout

  state = {
    dialogVisible: false,
    claimContents: {},
  }

  closeDialog(): void {
    this.setState({ dialogVisible: false, claimContents: {} })
  }

  openDialog(): void {
    this.setState({ dialogVisible: true })
  }

  // TODO function styles
  async createClaimAndRequestAttestation(): Promise<void> {
    const { claimContents } = this.state
    const { identityFromStore, addCredentialInStore } = this.props
    try {
      if (identityFromStore) {
        const claim = createMembershipClaim(
          claimContents as TClaimContents,
          identityFromStore
        )
        if (!claim || !identityFromStore) {
          return
        }
        const requestForAttestation = createRequestForAttestation(
          claim,
          identityFromStore
        )
        if (requestForAttestation) {
          addCredentialInStore({
            title: 'Membership Card',
            hash: requestForAttestation.hash,
            cTypeHash: requestForAttestation.ctypeHash.hash,
            status: CredentialStatus.AttestationPending,
            contents: requestForAttestation.claim.contents,
            requestTimestamp: Date.now(),
          })
          const claimerIdentity = getSdkIdentityFromStoredIdentity(
            identityFromStore
          )
          sendRequestForAttestation(requestForAttestation, claimerIdentity)
        }
      } else {
        console.info('No identity found')
      }
    } catch (error) {
      console.info('OK', error)
    }
  }

  onChangeClaimContentsInputs = (inputValue: string, ppty: string) => {
    // claim contents are generated from the input fields, which themselves are generated from the CTYPE json, to be flexible. Changing the CTYPE automatically changes this logics.
    this.setState(state => ({
      claimContents: { ...state.claimContents, [ppty]: inputValue },
    }))
  }

  async componentDidMount(): Promise<void> {
    // polling for new messages
    Dashboard.interval = setInterval(
      this.queryChainAndUpdateCredentialsInStore,
      POLLING_PERIOD_MS
    )
    // TODO: long poll, static vs not, async function subscribe()... ????
  }

  queryChainAndUpdateCredentialsInStore = async () => {
    const {
      credentialsMapFromStore,
      updateCredentialStatusInStore,
    } = this.props
    const claimHashes = Object.keys(credentialsMapFromStore)
    console.log(`${claimHashes.length} hashes to query`)
    claimHashes.forEach(async h => {
      console.log('[ATTESTATION] Querying hash......')
      const attestation = await Attestation.query(h)
      // todoprio why is the attestation not null?????/
      if (
        attestation &&
        attestation.cTypeHash !==
          '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        console.log(
          '[ATTESTATION] OK found on chain with not 0 ctype hash',
          attestation
        )
        const hashAndStatus = {
          hash: h,
          status: attestation.revoked
            ? CredentialStatus.Revoked
            : CredentialStatus.Valid,
        }
        updateCredentialStatusInStore(hashAndStatus)
      } else {
        console.log('[ATTESTATION] Not found on chain aka PENDING', attestation)
        // state should remain pending
        // .... maybe log an error here
      }
    })
  }

  componentWillUnmount(): void {
    clearInterval(Dashboard.interval)
  }

  render(): JSX.Element {
    const { credentialsMapFromStore } = this.props
    const { dialogVisible } = this.state
    const credentials = Object.values(credentialsMapFromStore)
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Dashboard</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>
              My credentials ({credentials.length})
            </Text>
            <KiltButton
              title="＋ Request membership card"
              onPress={() => {
                // todo needed or not
                this.openDialog()
              }}
            />
          </View>
          <CredentialList credentials={credentials || []} />
        </ScrollView>
        <AddClaimDialog
          visible={dialogVisible}
          onPressCancel={() => this.closeDialog()}
          onPressOK={async () => {
            await this.createClaimAndRequestAttestation()
            this.closeDialog()
          }}
          onChangeText={(inputValue, ppty) =>
            this.onChangeClaimContentsInputs(inputValue, ppty)
          }
        />
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  identityFromStore: state.identityReducer.identity,
  publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
  credentialsMapFromStore: state.credentialsReducer.credentialsMap,
})

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    addCredentialInStore: (credential: TCredential) => {
      dispatch(addCredential(credential))
    },
    updateCredentialStatusInStore: (hashAndStatus: THashAndClaimStatus) => {
      dispatch(updateCredentialStatus(hashAndStatus))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
