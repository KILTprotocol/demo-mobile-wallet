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
}

class Dashboard extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    balance: 0,
    balanceStatus: AsyncStatus.NotStarted,
    isDialogVisible: false,
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({ isDialogVisible: true })
  }

  onPressOK = () => {
    const claimContents = { ...this.state }
    const { identityFromStore, addCredentialInStore } = this.props
    // TODO cleanup
    delete claimContents['balance']
    delete claimContents['balanceStatus']
    delete claimContents['isDialogVisible']
    console.log('claimContentsppppppppppppppp', claimContents)

    const claim = createDriversLicenseClaim(claimContents, identityFromStore)
    if (claim) {
      console.log('identityFromStore', identityFromStore)
      const requestForAttestation = createRequestForAttestation(
        claim,
        identityFromStore
      )

      // contents: object

      console.log('requestForAttestation', requestForAttestation)
      addCredentialInStore({
        // TODO let user pick claim name
        title: "Driver's License",
        hash: requestForAttestation.hash,
        cTypeHash: requestForAttestation.ctypeHash,
        status: CredentialStatus.AttestationPending,
        contents: requestForAttestation.claim.contents,
      })
    }
    // console.log('claim', claim)
    // this.setState({ isDialogVisible: false })
    this.closeDialog()
  }

  onChangeText = (inputValue: string, ppty: string) => {
    // TODO function styles
    // TODO nest these in a parent ppties object
    this.setState({ [ppty]: inputValue })
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

  componentDidUpdate() {
    const { credentialsFromStore } = this.props
    console.log('credentialsFromStore', credentialsFromStore)
  }

  render(): JSX.Element {
    const { credentialsFromStore, identityFromStore } = this.props
    console.log('DASHBOARD identityFromStore', credentialsFromStore)
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
