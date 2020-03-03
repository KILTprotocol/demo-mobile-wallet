import React from 'react'
import { Text, View, TextStyle } from 'react-native'
import { CLR_TXT_LIGHT } from '../sharedStyles/styles.consts.colors'
import { flexRow } from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'

type Props = {
  propertyName: string
  propertyValue: any
}

const label: TextStyle = {
  marginRight: 12,
  color: CLR_TXT_LIGHT,
  textTransform: 'capitalize',
}

const isBoolean = (value: any): boolean => typeof value === 'boolean'

const ClaimProperty: React.FunctionComponent<Props> = ({
  propertyName,
  propertyValue,
}): JSX.Element => {
  return (
    <View key={propertyName} style={flexRow}>
      <Text style={[bodyTxt, label]}>{propertyName}</Text>
      {isBoolean(propertyValue) ? (
        <Text style={bodyTxt}>{propertyValue ? 'yes' : 'no'}</Text>
      ) : (
        <Text style={bodyTxt}>{propertyValue}</Text>
      )}
    </View>
  )
}

export default ClaimProperty
