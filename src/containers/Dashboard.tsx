import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Identity } from '@kiltprotocol/sdk-js'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { AppState } from '../redux/reducers'
import { AsyncStatus, LoadingIndicatorSize } from '../_enums'
import IdentityDisplay from '../components/IdentityDisplay'
import KiltButton from '../components/KiltButton'
import BalanceDisplay from '../components/BalanceDisplay'
import LoadingIndicator from '../components/LoadingIndicator'
import { getBalanceInKiltCoins } from '../services/service.balance'
import {
  mainViewContainer,
  sectionContainer,
} from '../sharedStyles/styles.layout'
import {
  sectionTitleTxt,
  mainTitleTxt,
} from '../sharedStyles/styles.typography'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  identity: Identity
}

type State = {
  balance: number
}

class Dashboard extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    balance: 0,
    balanceStatus: AsyncStatus.NotStarted,
  }

  async componentDidMount(): Promise<void> {
    const { identity } = this.props
    this.setState(prevState => ({
      ...prevState,
      balanceStatus: AsyncStatus.Pending,
    }))
    const balance = await getBalanceInKiltCoins(identity.address)
    this.setState(prevState => ({
      ...prevState,
      balance,
      balanceStatus: AsyncStatus.Success,
    }))
  }

  render(): JSX.Element {
    const { identity } = this.props
    const { balance, balanceStatus } = this.state
    console.log('in state', balance)
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={mainTitleTxt}>Dashboard</Text>
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>My identity</Text>
          <IdentityDisplay address={identity.address} />
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>KILT account balance</Text>
          {balanceStatus === AsyncStatus.Success && (
            <BalanceDisplay balance={balance} />
          )}
          {balanceStatus ===
            (AsyncStatus.NotStarted || AsyncStatus.Pending) && (
            <LoadingIndicator size={LoadingIndicatorSize.S} />
          )}
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>My claims</Text>
          <KiltButton
            title="Create driver's license"
            onPress={() => {
              console.log('pressed')
            }}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  identity: state.identity,
})

export default connect(mapStateToProps)(Dashboard)
