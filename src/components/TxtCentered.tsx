import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  txtCentered: {
    textAlign: 'center',
  },
})

const TxtCentered: React.FunctionComponent = ({
  children,
  style,
}): JSX.Element => <Text style={[styles.txtCentered, style]}>{children}</Text>

export default TxtCentered
