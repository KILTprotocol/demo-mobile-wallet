import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { PublicIdentity, Identity, Balance } from '@kiltprotocol/sdk-js'
import { connect } from 'react-redux'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import WithDefaultBackground from '../components/WithDefaultBackground'
import {
  mainTitleTxt,
  sectionTitleTxt,
} from '../sharedStyles/styles.typography'
import IdentityDisplay from '../components/IdentityDisplay'
import AddressQRCode from '../components/AddressQRCode'
import RequestTokensButton from '../components/RequestTokensButton'
import { TAppState } from '../redux/reducers'
import { TMapStateToProps } from '../_types'
import TokenTransferDialog from '../containers/TokenTransferDialog'
import KiltButton from '../components/KiltButton'
import BalanceComp from '../components/Balance'
import { asMicroKiltCoins } from '../services/service.balance'
import { getSdkIdentityFromStoredIdentity } from '../utils/utils.identity'
import { AsyncStatus } from '../_enums'
import { callWithDelay } from '../utils/utils.async'

type Props = {
  publicIdentityFromStore: PublicIdentity | null
  identityFromStore: Identity | null
  balanceFromStore: number
}

type State = {
  dialogVisible: boolean
  isDialogOkBtnDisabled: boolean
  tokenAmountToTransfer: number
  tokenRecipientAddress: string
  transferAsyncStatus: AsyncStatus
}

class Account extends Component<Props, State> {
  defaultState = {
    dialogVisible: false,
    isDialogOkBtnDisabled: true,
    tokenAmountToTransfer: 0,
    tokenRecipientAddress: '',
    transferAsyncStatus: AsyncStatus.NotStarted,
  }

  state = {
    ...this.defaultState,
  }

  componentDidUpdate(): void {
    const {
      tokenRecipientAddress,
      tokenAmountToTransfer,
      isDialogOkBtnDisabled,
    } = this.state
    if (
      tokenRecipientAddress &&
      tokenAmountToTransfer &&
      isDialogOkBtnDisabled
    ) {
      this.setState({
        ...this.state,
        isDialogOkBtnDisabled: false,
      })
    } else if (
      (!tokenRecipientAddress || !tokenAmountToTransfer) &&
      !isDialogOkBtnDisabled
    ) {
      this.setState({
        ...this.state,
        isDialogOkBtnDisabled: true,
      })
    }
  }

  openDialog(): void {
    // todo use .. this.state (needed???)
    this.setState({
      dialogVisible: true,
      isDialogOkBtnDisabled: true,
      tokenAmountToTransfer: 0,
      tokenRecipientAddress: '',
      transferAsyncStatus: AsyncStatus.NotStarted,
    })
  }

  closeDialog(): void {
    // todo rename booleans
    // todo use hooks for dialogs
    this.setState({ dialogVisible: false })
  }

  setTokenAmountToTransfer(tokenAmountToTransfer: number): void {
    this.setState({ tokenAmountToTransfer })
  }

  setTokenRecipientAddress(tokenRecipientAddress: string): void {
    this.setState({ tokenRecipientAddress })
  }

  async transferTokens(): Promise<void> {
    // todo refactor nicely
    // TODOprio bug always transfer one token more......
    // todo transfer crashes when user has no tokens
    // todo disable transfer token button when user has no token????
    const { tokenRecipientAddress, tokenAmountToTransfer } = this.state
    const { identityFromStore } = this.props
    if (identityFromStore && tokenRecipientAddress) {
      this.setState({ transferAsyncStatus: AsyncStatus.Pending })
      const transferAmount = asMicroKiltCoins(tokenAmountToTransfer)
      console.info(
        `[TRANSFER] Starting transfer of ${tokenAmountToTransfer} (${transferAmount})...`
      )
      try {
        console.info('[TRANSFER] Trying transfer...')
        await Balance.makeTransfer(
          getSdkIdentityFromStoredIdentity(identityFromStore),
          tokenRecipientAddress,
          transferAmount
        )
        this.setState({ transferAsyncStatus: AsyncStatus.Success })
      } catch (error) {
        console.info(`[TRANSFER] Blockchain error: ${error}`)
        this.setState({ transferAsyncStatus: AsyncStatus.Error })
      }
    } else {
      this.setState({ transferAsyncStatus: AsyncStatus.Error })
      console.info(
        `[TRANSFER] App error: No identity or no tokenRecipientAddress found (tokenRecipientAddress: ${tokenRecipientAddress}, identityFromStore: ${identityFromStore})`
      )
    }
    // delay in order to let the user see the error message
    callWithDelay(
      () => {
        this.closeDialog()
      },
      [],
      1200
    )
  }

  render(): JSX.Element {
    const { publicIdentityFromStore, balanceFromStore } = this.props
    const {
      dialogVisible,
      tokenRecipientAddress,
      transferAsyncStatus,
      isDialogOkBtnDisabled,
    } = this.state
    const address = publicIdentityFromStore
      ? publicIdentityFromStore.address
      : null
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Account</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>My address</Text>
            {address && (
              <>
                <AddressQRCode address={address} />
                <IdentityDisplay address={address} />
              </>
            )}
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>My KILT account balance</Text>
            <BalanceComp balance={balanceFromStore} />
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>Actions</Text>
            {address && <RequestTokensButton address={address} />}
            <KiltButton
              disabled={!balanceFromStore}
              title="↔ Transfer tokens"
              onPress={() => {
                this.openDialog()
              }}
            />
          </View>
          <TokenTransferDialog
            visible={dialogVisible}
            isOkBtnDisabled={isDialogOkBtnDisabled}
            tokenRecipientAddress={tokenRecipientAddress}
            onPressCancel={() => {
              this.setState({ tokenRecipientAddress: '' })
              this.closeDialog()
            }}
            onChangeTokenAmountToTransfer={amount =>
              this.setTokenAmountToTransfer(amount)
            }
            onTokenRecipientAddressRead={(recipientAddress: string) => {
              this.setTokenRecipientAddress(recipientAddress)
            }}
            onConfirmTransfer={async () => {
              this.transferTokens()
            }}
            transferAsyncStatus={transferAsyncStatus}
          />
        </ScrollView>
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
  identityFromStore: state.identityReducer.identity,
  balanceFromStore: state.balanceReducer.balance,
})

export default connect(mapStateToProps)(Account)
