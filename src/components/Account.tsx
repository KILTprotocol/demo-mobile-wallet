import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { connect } from 'react-redux'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import WithDefaultBackground from './WithDefaultBackground'
import {
  mainTitleTxt,
  sectionTitleTxt,
} from '../sharedStyles/styles.typography'
import IdentityDisplay from './IdentityDisplay'
import AddressQRCode from './AddressQRCode'
import RequestTokensButton from './RequestTokensButton'
import { TAppState } from '../redux/reducers'
import { TMapStateToProps } from '../_types'
import { AsyncStatus } from '../_enums'
import BalanceLoadable from './BalanceLoadable'
import { getBalanceInKiltCoins } from '../services/service.balance'

type Props = {
  publicIdentityFromStore: PublicIdentity | null
}

type State = {
  balance: number
  balanceAsyncStatus: AsyncStatus
}

class Account extends React.Component<Props, State> {
  state = {
    balance: 0,
    balanceAsyncStatus: AsyncStatus.NotStarted,
    isDialogVisible: false,
    claimContents: {},
    msgsHashes: [],
    msgs: [],
  }

  async componentDidMount(): Promise<void> {
    const { publicIdentityFromStore } = this.props
    const address = publicIdentityFromStore
      ? publicIdentityFromStore.address
      : null

    this.setState(prevState => ({
      ...prevState,
      balanceAsyncStatus: AsyncStatus.Pending,
    }))
    const balance = address ? await getBalanceInKiltCoins(address) : 0
    this.setState(prevState => ({
      ...prevState,
      balance,
      balanceAsyncStatus: AsyncStatus.Success,
    }))
  }

  render(): JSX.Element {
    const { publicIdentityFromStore } = this.props
    const address = publicIdentityFromStore
      ? publicIdentityFromStore.address
      : null
    const { balance, balanceAsyncStatus } = this.state
    return (
      <WithDefaultBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={mainTitleTxt}>Account</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>My address</Text>
            {address && <IdentityDisplay address={address} />}
            {address && <AddressQRCode address={address} />}
          </View>
          <View style={sectionContainer}>
            <Text style={sectionTitleTxt}>KILT account balance</Text>
            <BalanceLoadable
              asyncStatus={balanceAsyncStatus}
              balance={balance}
            />
            {address && <RequestTokensButton address={address} />}
          </View>
        </ScrollView>
      </WithDefaultBackground>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => ({
  publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
})

export default connect(mapStateToProps)(Account)
