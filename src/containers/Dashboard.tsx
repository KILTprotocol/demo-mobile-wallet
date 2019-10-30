import React from 'react'
import { View, Text, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Identity } from '@kiltprotocol/sdk-js'
import { Dispatch } from 'redux'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { AppState } from '../redux/reducers'
import { AsyncStatus, LoadingIndicatorSize, CredentialStatus } from '../_enums'
import IdentityDisplay from '../components/IdentityDisplay'
import KiltButton from '../components/KiltButton'
import BalanceDisplay from '../components/BalanceDisplay'
import LoadingIndicator from '../components/LoadingIndicator'
import { getBalanceInKiltCoins } from '../services/service.balance'
import {
  mainViewContainer,
  sectionContainer,
  fixedHeight,
} from '../sharedStyles/styles.layout'
import {
  sectionTitleTxt,
  mainTitleTxt,
} from '../sharedStyles/styles.typography'
import WithDefaultBackground from '../components/WithDefaultBackground'
import { getRequestTokensUrl } from '../utils/utils.faucet'
import CredentialsDialog from '../components/CredentialsDialog'
import {
  createDriversLicenseClaim,
  createRequestForAttestation,
  DriversLicenseClaimContents,
} from '../services/service.claim'
import { addCredential } from '../redux/actions'
import { CredentialType } from '../redux/credentialsReducer'
import Credential from '../components/Credential'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identityFromStore: Identity | null
  addCredentialInStore: typeof addCredential
}

type State = {
  balance: number
  isDialogVisible: boolean
  balanceStatus: AsyncStatus
  claimContents: object
}

class Dashboard extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    balance: 0,
    balanceStatus: AsyncStatus.NotStarted,
    isDialogVisible: false,
    claimContents: {},
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({ isDialogVisible: true })
  }

  // TODO function styles
  onPressOK = () => {
    const { claimContents } = this.state
    const { identityFromStore, addCredentialInStore } = this.props

    const claim = createDriversLicenseClaim(
      claimContents as DriversLicenseClaimContents,
      identityFromStore
    )
    if (claim) {
      console.log('identityFromStore', identityFromStore)
      const requestForAttestation = createRequestForAttestation(
        claim,
        identityFromStore
      )
      console.log('requestForAttestation', requestForAttestation)
      if (requestForAttestation) {
        addCredentialInStore({
          // TODO let user pick claim name
          title: "Driver's License",
          hash: requestForAttestation.hash,
          cTypeHash: requestForAttestation.ctypeHash,
          status: CredentialStatus.AttestationPending,
          contents: requestForAttestation.claim.contents,
        })
      }
    }
    this.closeDialog()
  }

  onChangeText = (inputValue: string, ppty: string) => {
    // the claim contents are generated based purely on the input fields, which themselves are generated from the CTYPE
    // this way, we remain flexible/modular: changing the CTYPE automatically changes this logics
    this.setState(state => ({
      claimContents: { ...state.claimContents, [ppty]: inputValue },
    }))
  }

  async componentDidMount(): Promise<void> {
    const { identityFromStore } = this.props
    this.setState(prevState => ({
      ...prevState,
      balanceStatus: AsyncStatus.Pending,
    }))
    const balance = identityFromStore
      ? await getBalanceInKiltCoins(identityFromStore.address)
      : 0
    this.setState(prevState => ({
      ...prevState,
      balance,
      balanceStatus: AsyncStatus.Success,
    }))
  }

  render(): JSX.Element {
    const { credentialsFromStore, identityFromStore } = this.props
    const { balance, balanceStatus, isDialogVisible } = this.state
    return (
      <WithDefaultBackground>
        <View style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Dashboard</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>My identity</Text>
            {identityFromStore && (
              <IdentityDisplay address={identityFromStore.address} />
            )}
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>KILT account balance</Text>
            <View style={fixedHeight}>
              {balanceStatus === AsyncStatus.Success && (
                <BalanceDisplay balance={balance} />
              )}
              {balanceStatus === AsyncStatus.Pending && (
                <LoadingIndicator size={LoadingIndicatorSize.S} />
              )}
            </View>
            {identityFromStore && (
              <KiltButton
                title="Request tokens"
                onPress={() => {
                  Linking.openURL(
                    getRequestTokensUrl(identityFromStore.address)
                  )
                }}
              />
            )}
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>My credentials</Text>
            {credentialsFromStore.length < 1 && (
              <KiltButton
                title="Request driver's license"
                onPress={() => {
                  this.openDialog()
                }}
              />
            )}
          </View>
          {credentialsFromStore.map((cred: CredentialType) => (
            <View style={sectionContainer} key={cred.hash}>
              <Credential
                title={cred.title}
                status={cred.status}
                contents={cred.contents}
              />
            </View>
          ))}
        </View>
        <CredentialsDialog
          claimerIdentity={identityFromStore}
          visible={isDialogVisible}
          onPressCancel={() => this.closeDialog()}
          onPressOK={() => this.onPressOK()}
          onChangeText={(inputValue, ppty) =>
            this.onChangeText(inputValue, ppty)
          }
        />
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: AppState): any => ({
  identityFromStore: state.identityReducer.identity,
  credentialsFromStore: state.credentialsReducer.credentials,
})

const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    addCredentialInStore: (credential: CredentialType) => {
      dispatch(addCredential(credential))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
