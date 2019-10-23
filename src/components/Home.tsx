import React from 'react'
import { Text, View } from 'react-native'
import { mainViewContainer } from '../sharedStyles/styles.layout'

const Home: React.FunctionComponent = (): JSX.Element => (
  <View style={mainViewContainer}>
    <Text>
      This should be a tabbed view containing the dashboard, contacts, etc
    </Text>
  </View>
)

export default Home
