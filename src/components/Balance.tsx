import React from 'react'
import { Text, View, TextStyle, ViewStyle } from 'react-native'
import { bodyTxt, lTxt } from '../sharedStyles/styles.typography'
import { flexRowLayoutBaseline } from '../sharedStyles/styles.layout'
import {
  BALANCE_PLUS_CLR,
  BALANCE_ZERO_CLR,
} from '../sharedStyles/styles.consts.colors'

type Props = {
  balance: number
}

const plus: TextStyle = {
  color: BALANCE_PLUS_CLR,
}

const zero: TextStyle = {
  color: BALANCE_ZERO_CLR,
}

const balanceNr: ViewStyle = {
  marginRight: 2,
}

// todo prio balance is not reset!!!
const Balance: React.FunctionComponent<Props> = ({ balance }): JSX.Element => (
  <View style={flexRowLayoutBaseline}>
    <Text style={[bodyTxt, lTxt, balanceNr, balance > 0 ? plus : zero]}>
      {balance}
    </Text>
    <Text style={[bodyTxt]}> KILT Coins</Text>
  </View>
)

export default Balance
