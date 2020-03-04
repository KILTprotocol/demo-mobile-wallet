import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import {
  PublicIdentity,
  Identity,
  Balance,
  IPublicIdentity,
} from '@kiltprotocol/sdk-js'
import { connect } from 'react-redux'
import Address from '../components/Address'
import AccountProperty from '../components/AccountProperty'
import {
  mainViewContainer,
  sectionContainer,
  centered,
  paddedTopS,
} from '../sharedStyles/styles.layout'
import WithDefaultBackground from '../components/WithDefaultBackground'
import {
  h1,
  h2,
  bodyTxt,
  monospaceTxt,
} from '../sharedStyles/styles.typography'
import RequestTokensButton from '../components/RequestTokensButton'
import { TAppState } from '../redux/reducers'
import { TMapStateToProps } from '../types'
import TokenTransferDialog from '../components/TokenTransferDialog'
import KiltButton from '../components/KiltButton'
import BalanceComp from '../components/Balance'
import { asMicroKiltCoins } from '../services/service.balance'
import { fromStoredIdentity } from '../utils/utils.identity'
import { AsyncStatus } from '../enums'
import { callWithDelay } from '../utils/utils.async'
import PublicIdentityQrCode from '../components/PublicIdentityQrCode'
import { encodePublicIdentity } from '../utils/utils.encoding'

type Props = {
  publicIdentityFromStore: PublicIdentity | null
  identityFromStore: Identity | null
  balanceFromStore: number
}

type State = {
  isDialogVisible: boolean
  isDialogOkBtnDisabled: boolean
  tokenAmountToTransfer: number
  tokenRecipientAddress: IPublicIdentity['address']
  transferAsyncStatus: AsyncStatus
}

class Account extends Component<Props, State> {
  defaultState = {
    isDialogVisible: false,
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
        isDialogOkBtnDisabled: false,
      })
    } else if (
      (!tokenRecipientAddress || !tokenAmountToTransfer) &&
      !isDialogOkBtnDisabled
    ) {
      this.setState({
        isDialogOkBtnDisabled: true,
      })
    }
  }

  setTokenAmountToTransfer(tokenAmountToTransfer: number): void {
    this.setState({ tokenAmountToTransfer })
  }

  setTokenRecipientAddress(
    tokenRecipientAddress: IPublicIdentity['address']
  ): void {
    this.setState({ tokenRecipientAddress })
  }

  closeDialog(): void {
    this.setState({ isDialogVisible: false })
  }

  openDialog(): void {
    this.setState({
      isDialogVisible: true,
      isDialogOkBtnDisabled: true,
      tokenAmountToTransfer: 0,
      tokenRecipientAddress: '',
      transferAsyncStatus: AsyncStatus.NotStarted,
    })
  }

  async transferTokens(): Promise<void> {
    const { tokenRecipientAddress, tokenAmountToTransfer } = this.state
    const { identityFromStore } = this.props
    if (identityFromStore && tokenRecipientAddress) {
      this.setState({ transferAsyncStatus: AsyncStatus.Pending })
      const transferAmount = asMicroKiltCoins(tokenAmountToTransfer)
      console.info(
        `[TRANSFER] Transferring ${tokenAmountToTransfer} (${transferAmount})...`
      )
      try {
        console.info('[TRANSFER] Trying transfer...')
        await Balance.makeTransfer(
          fromStoredIdentity(identityFromStore),
          tokenRecipientAddress,
          transferAmount
        )
        this.setState({ transferAsyncStatus: AsyncStatus.Success })
      } catch (error) {
        this.setState({ transferAsyncStatus: AsyncStatus.Error })
        console.info(`[TRANSFER] Blockchain error: ${error}`)
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
      isDialogVisible,
      tokenRecipientAddress,
      transferAsyncStatus,
      isDialogOkBtnDisabled,
    } = this.state
    const { address, serviceAddress } = publicIdentityFromStore
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={h1}>Account</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={h2}>My identity</Text>
            {address && publicIdentityFromStore && (
              <View>
                <View style={centered}>
                  <PublicIdentityQrCode
                    publicIdentityEncoded={encodePublicIdentity(
                      publicIdentityFromStore
                    )}
                  />
                </View>
                <View>
                  <View style={paddedTopS}>
                    <AccountProperty propertyName="Address">
                      <Address address={address} />
                    </AccountProperty>
                  </View>
                  <View style={paddedTopS}>
                    <AccountProperty propertyName="Messaging address">
                      <Text style={[bodyTxt, monospaceTxt]}>
                        {serviceAddress}
                      </Text>
                    </AccountProperty>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={sectionContainer}>
            <Text style={h2}>My KILT account balance</Text>
            <BalanceComp balance={balanceFromStore} />
          </View>
          <View style={sectionContainer}>
            <Text style={h2}>Actions</Text>
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
            visible={isDialogVisible}
            isOkBtnDisabled={isDialogOkBtnDisabled}
            tokenRecipientAddress={tokenRecipientAddress}
            onPressCancel={() => {
              this.setState({ tokenRecipientAddress: '' })
              this.closeDialog()
            }}
            onChangeTokenAmountToTransfer={amount =>
              this.setTokenAmountToTransfer(amount)
            }
            onTokenRecipientAddressRead={(
              recipientAddress: IPublicIdentity['address']
            ) => {
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

export default connect(
  mapStateToProps,
  null
)(Account)
