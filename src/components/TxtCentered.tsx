import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  txtCentered: {
    textAlign: 'center',
  },
})

const TxtCentered: React.FunctionComponent = ({ children }): JSX.Element => (
  <Text style={styles.txtCentered}>{children}</Text>
)

export default TxtCentered
