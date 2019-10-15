import React from 'react'
import { Text, View } from 'react-native'
import { mainViewContainer } from './sharedStyles/utils.layout'

const Home: React.FunctionComponent = (): JSX.Element => (
  <View style={mainViewContainer}>
    <Text>Home</Text>
  </View>
)

export default Home
