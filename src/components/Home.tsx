import React from 'react'
import { Text, View } from 'react-native'
import { mainViewContainer } from '../sharedStyles/utils.layout'

// this should be a tabbed view with the dashboard, contacts, etc

const Home: React.FunctionComponent = (): JSX.Element => (
  <View style={mainViewContainer}>
    <Text>Home</Text>
  </View>
)

export default Home
