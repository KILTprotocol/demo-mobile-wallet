import React from 'react'
import { Text } from 'react-native'
import { txtCentered } from '../sharedStyles/styles.typography'

type Props = {
  children?: any
  style?: any
}

const TxtCentered: React.FunctionComponent<Props> = ({
  children,
  style,
}): JSX.Element => <Text style={[txtCentered, style]}>{children}</Text>

export default TxtCentered
