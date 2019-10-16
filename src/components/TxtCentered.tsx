import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  txtCentered: {
    textAlign: 'center',
  },
})

const TxtCentered: React.FunctionComponent = (props): JSX.Element => (
  <Text style={styles.txtCentered}>{props.children}</Text>
)

export default TxtCentered
