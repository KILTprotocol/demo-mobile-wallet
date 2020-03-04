import React from 'react'
import { Text, View, TextStyle, ViewStyle } from 'react-native'
import { CLR_TXT_LIGHT } from '../sharedStyles/styles.consts.colors'
import { flexRowStart } from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'

type Props = {
  propertyName: string
}

const label: TextStyle = {
  marginRight: 12,
  color: CLR_TXT_LIGHT,
  textTransform: 'capitalize',
}

const key: ViewStyle = {
  flex: 2,
}

const value: ViewStyle = {
  flex: 3,
}

const AccountProperty: React.FunctionComponent<Props> = ({
  propertyName,
  children,
}): JSX.Element => {
  return (
    <View key={propertyName} style={flexRowStart}>
      <View style={key}>
        <Text style={[bodyTxt, label]}>{propertyName}</Text>
      </View>
      <View style={value}>{children}</View>
    </View>
  )
}

export default AccountProperty
