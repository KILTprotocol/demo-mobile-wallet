import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import { PublicIdentity, Identity } from '@kiltprotocol/sdk-js'
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

type Props = {
  publicIdentityFromStore: PublicIdentity | null
  identityFromStore: Identity | null
  balanceFromStore: number
}

type State = {
  dialogVisible: boolean
  tokenAmountToTransfer: number
  tokenRecipientAddress: string
}

class Account extends Component<Props, State> {
  state = {
    dialogVisible: false,
    tokenAmountToTransfer: 0,
    tokenRecipientAddress: '',
  }

  openDialog(): void {
    this.setState({ dialogVisible: true })
  }

  closeDialog(): void {
    // todo rename boooleans
    // todo use hooks for dialogs
    this.setState({ dialogVisible: false })
  }

  setTokenAmountToTransfer(tokenAmountToTransfer: number): void {
    this.setState({ tokenAmountToTransfer })
  }

  setTokenRecipientAddress(tokenRecipientAddress: string): void {
    this.setState({ tokenRecipientAddress })
  }

  render(): JSX.Element {
    const { publicIdentityFromStore, balanceFromStore } = this.props
    const { dialogVisible, tokenRecipientAddress } = this.state

    console.log('balanceFromStore', balanceFromStore)
    const address = publicIdentityFromStore
      ? publicIdentityFromStore.address
      : null

    // todo get balance at t = 0
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
                <IdentityDisplay address={address} />
                <AddressQRCode address={address} />
              </>
            )}
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>KILT account balance</Text>
            <BalanceComp balance={balanceFromStore} />
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>Actions</Text>
            {address && <RequestTokensButton address={address} />}
            <KiltButton
              title="Transfer tokens"
              onPress={() => {
                this.openDialog()
              }}
            />
          </View>
          <TokenTransferDialog
            visible={dialogVisible}
            tokenRecipientAddress={tokenRecipientAddress}
            onPressCancel={() => {
              this.setState({ tokenRecipientAddress: '' })
              this.closeDialog()
            }}
            onChangeTokenAmountToTransfer={tokenAmountToTransfer =>
              this.setTokenAmountToTransfer(tokenAmountToTransfer)
            }
            onTokenRecipientAddressRead={(tokenRecipientAddress: string) => {
              this.setTokenRecipientAddress(tokenRecipientAddress)
            }}
            onPressOK={async () => {
              // todo implement transfer
              console.log('try transferring.....')
            }}
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
