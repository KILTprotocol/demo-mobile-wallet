import React from 'react'
import { Text } from 'react-native'

const TxtCentered: React.FunctionComponent = (props): JSX.Element => (
  <Text style={{ textAlign: 'center' }}>{props.children}</Text>
)

export default TxtCentered
