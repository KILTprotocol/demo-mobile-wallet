import React from 'react'
import { Text, View, TextStyle, ViewStyle } from 'react-native'
import { bodyTxt, lTxt } from '../sharedStyles/styles.typography'
import { flexRowBaseline } from '../sharedStyles/styles.layout'
import {
  CLR_BALANCE_POSITIVE,
  CLR_BALANCE_ZERO,
} from '../sharedStyles/styles.consts.colors'

type Props = {
  balance: number
}

const plus: TextStyle = {
  color: CLR_BALANCE_POSITIVE,
}

const zero: TextStyle = {
  color: CLR_BALANCE_ZERO,
}

const balanceNumber: ViewStyle = {
  marginRight: 2,
}

// todo prio balance is not reset!!!
const Balance: React.FunctionComponent<Props> = ({ balance }): JSX.Element => (
  <View style={flexRowBaseline}>
    <Text style={[bodyTxt, lTxt, balanceNumber, balance > 0 ? plus : zero]}>
      {balance}
    </Text>
    <Text style={[bodyTxt]}> KILT Coins</Text>
  </View>
)

export default Balance
