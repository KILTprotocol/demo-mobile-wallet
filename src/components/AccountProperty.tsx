import React from 'react'
import { Text, View, TextStyle, ViewStyle } from 'react-native'
import { CLR_TXT_LIGHT } from '../sharedStyles/styles.consts.colors'
import { flexRowStart } from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'

type Props = {
  propertyName: string
  propertyValue: any
}

const label: TextStyle = {
  marginRight: 12,
  width: 88,
  color: CLR_TXT_LIGHT,
  textTransform: 'capitalize',
}

const key: ViewStyle = {
  flex: 2,
}

const value: ViewStyle = {
  flex: 5,
}

const valueTxt: TextStyle = {
  // use a monospace font to ensure consistent length of the address display
  fontFamily: 'Courier',
}

const AccountProperty: React.FunctionComponent<Props> = ({
  propertyName,
  propertyValue,
}): JSX.Element => {
  return (
    <View key={propertyName} style={flexRowStart}>
      <View style={key}>
        <Text style={[bodyTxt, label]}>{propertyName}</Text>
      </View>
      <View style={value}>
        <Text style={[bodyTxt, valueTxt]}>{propertyValue}</Text>
      </View>
    </View>
  )
}

export default AccountProperty
