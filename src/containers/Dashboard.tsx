import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  Identity,
  IEncryptedMessage,
  Message,
  IMessage,
  MessageBodyType,
  PublicIdentity,
} from '@kiltprotocol/sdk-js'
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
import { getInboxUrlFromAddress } from '../utils/utils.messaging'
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
  msgsHashes: string[]
  msgs: IEncryptedMessage[]
}

class Dashboard extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  static interval: NodeJS.Timeout

  state = {
    dialogVisible: false,
    claimContents: {},
    msgsHashes: [],
    msgs: [],
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
          })
          const claimerIdentity = getSdkIdentityFromStoredIdentity(
            identityFromStore
          )
          sendRequestForAttestation(requestForAttestation, claimerIdentity)
        }
      } else {
        console.error('No identity found')
      }
    } catch (error) {
      console.error('OK', error)
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
      this.fetchAndHandleMessagesToUser,
      POLLING_PERIOD_MS
    )
    // TODO: long poll, static vs not, async function subscribe()... ????
  }

  getNewMsgsHashes(prevMsgsHashes: string[], msgsHashes: string[]): string[] {
    return msgsHashes.filter(hash => !prevMsgsHashes.includes(hash))
  }

  handleNewMsgs(newMsgsHashes: string[]): void {
    const { identityFromStore, updateCredentialStatusInStore } = this.props
    if (!identityFromStore) {
      return
    }
    console.log('💥💥💥 New messages received', newMsgsHashes[0])
    newMsgsHashes.map(h => {
      // TODO merge mgs and hashes
      const encryptedMsg = this.state.msgs.find(m => m.hash === h)
      console.log(encryptedMsg)
      const claimerIdentity = getSdkIdentityFromStoredIdentity(
        identityFromStore
      )
      const msg: IMessage = Message.createFromEncryptedMessage(
        encryptedMsg,
        claimerIdentity
      )
      try {
        Message.ensureOwnerIsSender(msg)
        if (msg.body.type === MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM) {
          const hashAndStatus = {
            hash: msg.body.content.attestation.claimHash,
            status: CredentialStatus.Valid,
          }
          console.log('ATTESTED', hashAndStatus)
          updateCredentialStatusInStore(hashAndStatus)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  componentDidUpdate(_: any, prevState: State): void {
    const { msgsHashes } = this.state
    const prevMsgsHashes = prevState.msgsHashes
    const newMsgsHashes = this.getNewMsgsHashes(prevMsgsHashes, msgsHashes)
    if (newMsgsHashes.length > 0) {
      // only handle new messages, here message deletion is irrelevant
      this.handleNewMsgs(newMsgsHashes)
    }
  }

  fetchAndHandleMessagesToUser = async () => {
    const { publicIdentityFromStore } = this.props
    if (!publicIdentityFromStore) {
      return
    }
    fetch(getInboxUrlFromAddress(publicIdentityFromStore.address))
      .then(response => {
        return response.json()
      })
      .catch(error => {
        console.log(error)
        return null
      })
      .then((encryptedMessages: IEncryptedMessage[]) => {
        const encryptedMsgsHashes = encryptedMessages.map(msg => msg.hash)
        this.setState({
          msgsHashes: encryptedMsgsHashes,
          msgs: encryptedMessages,
        })
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
              title="Request membership card"
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
