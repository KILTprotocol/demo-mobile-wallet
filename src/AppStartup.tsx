import React from 'react'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'

import { View } from 'react-native'
import { getIdentity } from './services/service.identity'
import LoadingIndicator from './components/LoadingIndicator'
import { APP, SETUP } from './_routes'
import { mainViewContainer } from './sharedStyles/styles.layout'
import { callWithDelay } from './utils/utils.async'
type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class AppStartup extends React.Component<Props> {
  componentDidMount(): void {
    this.bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const identity = await callWithDelay(getIdentity, [])
    console.log('identity', identity)
    this.props.navigation.navigate(identity ? APP : SETUP)
  }

  render(): JSX.Element {
    return (
      <View>
        <View style={mainViewContainer}>
          <LoadingIndicator />
        </View>
      </View>
    )
  }
}
export default AppStartup
