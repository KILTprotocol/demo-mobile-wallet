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
  queryAttestationByHash,
  checkAttestationExistsOnChain,
  formatDateForClaim,
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
import { fromStoredIdentity } from '../utils/utils.identity'
import { TMapDispatchToProps, TMapStateToProps } from '../_types'
import { NAME, BIRTHDAY, PREMIUM } from '../data/claimProperties'

const ctype = require('../data/ctypeMembership.json')

const propertiesNames = Object.keys(ctype.schema.properties)

const claimProperties = propertiesNames.reduce(
  (acc, c) => [
    ...acc,
    {
      id: c,
      ...ctype.schema.properties[c],
    },
  ],
  []
)

// const start = {
//   name: {
//     type: 'string',
//   },
//   birthday: {
//     type: 'string',
//     format: 'date',
//   },
//   premium: {
//     type: 'boolean',
//   },
// }
// const end = [
//   {
//     id: 'name',
//     type: 'string',
//   },
//   {
//     id: 'birthday',
//     type: 'string',
//     format: 'date',
//   },
//   {
//     id: 'premium',
//     type: 'boolean',
//   },
// ]

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  publicIdentityFromStore: PublicIdentity | null
  credentialsMapFromStore: TCredentialMapByHash
  addCredentialInStore: typeof addCredential
  updateCredentialStatusInStore: typeof updateCredentialStatus
  usernameFromStore: string
}

type State = {
  claimContents: object
  isDialogVisible: boolean
}

class Dashboard extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  static interval: NodeJS.Timeout

  claimContentsDefault = {
    [NAME]: this.props.usernameFromStore,
    [BIRTHDAY]: Date.now(),
    [PREMIUM]: true,
  }

  state = {
    isDialogVisible: false,
    claimContents: {
      [NAME]: this.props.usernameFromStore,
      [BIRTHDAY]: Date.now(),
      [PREMIUM]: true,
    },
  }

  areClaimContentsOk(claimContents: any): boolean {
    const areAllClaimPropertiesPresent =
      Object.keys(claimContents).length === claimProperties.length
    const areAllClaimPropertiesTruthy = !Object.values(claimContents).some(
      claimPropertyValue => !claimPropertyValue
    )
    return areAllClaimPropertiesPresent && areAllClaimPropertiesTruthy
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({ isDialogVisible: true })
  }

  async createClaimAndRequestAttestation(): Promise<void> {
    const { claimContents } = this.state
    const formattedClaimContents = {
      name: claimContents.name,
      premium: claimContents.premium,
      birthday: formatDateForClaim(claimContents.birthday),
    }

    const { identityFromStore, addCredentialInStore } = this.props
    try {
      if (identityFromStore) {
        const claim = createMembershipClaim(
          formattedClaimContents as TClaimContents,
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
          const claimerIdentity = fromStoredIdentity(identityFromStore)
          await sendRequestForAttestation(
            requestForAttestation,
            claimerIdentity
          )
        }
      } else {
        console.info('[CREATE REQUEST] No identity found')
      }
    } catch (error) {
      console.info('[CREATE REQUEST] Error:', error)
    }
  }

  onChangeClaimContentsInputs = (
    inputValue: string,
    claimPropertyId: string
  ) => {
    this.setState(state => ({
      claimContents: { ...state.claimContents, [claimPropertyId]: inputValue },
    }))
  }

  async componentDidMount(): Promise<void> {
    // polling for new messages
    Dashboard.interval = setInterval(
      this.queryChainAndUpdateCredentialsInStore,
      POLLING_PERIOD_MS
    )
  }

  queryChainAndUpdateCredentialsInStore = async () => {
    const {
      credentialsMapFromStore,
      updateCredentialStatusInStore,
    } = this.props
    const claimHashes = Object.keys(credentialsMapFromStore)
    claimHashes.forEach(async h => {
      console.info('[ATTESTATION] Querying hash...')
      const attestation = await queryAttestationByHash(h)
      if (checkAttestationExistsOnChain(attestation)) {
        console.info(
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
    const { credentialsMapFromStore, usernameFromStore } = this.props
    const { isDialogVisible, claimContents } = this.state
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
                this.openDialog()
              }}
            />
          </View>
          <CredentialList credentials={credentials || []} />
        </ScrollView>
        <AddClaimDialog
          visible={isDialogVisible}
          onPressCancel={() => this.closeDialog()}
          onPressOK={async () => {
            await this.createClaimAndRequestAttestation()
            this.closeDialog()
            this.setState({ claimContents: this.claimContentsDefault })
          }}
          onChangeValue={(value, claimPropertyId) => {
            this.onChangeClaimContentsInputs(value, claimPropertyId)
          }}
          username={usernameFromStore}
          claimContentsDefault={this.claimContentsDefault}
          claimContents={claimContents}
        />
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  identityFromStore: state.identityReducer.identity,
  publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
  credentialsMapFromStore: state.credentialsReducer.credentialsMap,
  usernameFromStore: state.usernameReducer.username,
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
