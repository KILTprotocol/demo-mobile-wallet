import React from 'react'
import { Text, View, TextStyle } from 'react-native'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { flexRowLayout } from '../sharedStyles/styles.layout'
import {
  BALANCE_PLUS_CLR,
  BALANCE_ZERO_CLR,
} from '../sharedStyles/styles.consts.colors'

type Props = {
  balance: number
}

const green: TextStyle = {
  color: BALANCE_PLUS_CLR,
}

const red: TextStyle = {
  color: BALANCE_ZERO_CLR,
}

const BalanceDisplay: React.FunctionComponent<Props> = ({
  balance,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <Text style={[bodyTxt, balance > 0 ? green : red]}>{balance}</Text>
  </View>
)

export default BalanceDisplay
