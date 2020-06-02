import React from 'react'
import { View, Text } from 'react-native'
import { sectionContainer } from '../sharedStyles/styles.layout'
import { titleInvertedClrTxt, h2 } from '../sharedStyles/styles.typography'

const Device: React.FunctionComponent = () => {
  return (
    <View style={sectionContainer}>
      <Text style={[h2, titleInvertedClrTxt]}>Hello World</Text>
    </View>
  )
}

export default Device
