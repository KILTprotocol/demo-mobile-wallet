import React from 'react'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { View } from 'react-native'
import { getIdentity } from '../services/service.identity'
import LoadingIndicator from '../components/LoadingIndicator'
import { APP, SETUP } from '../_routes'
import { mainViewContainer, fullCenter } from '../sharedStyles/styles.layout'
import { callWithDelay } from '../utils/utils.async'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class AppStartup extends React.Component<Props> {
  componentDidMount(): void {
    this.bootstrapAsync()
  }

  bootstrapAsync = async () => {
    const { navigation } = this.props
    const identity = await callWithDelay(getIdentity, [])
    console.log('identity', identity)
    navigation.navigate(identity ? APP : SETUP)
  }

  render(): JSX.Element {
    return (
      <View>
        <View style={mainViewContainer}>
          <View style={fullCenter}>
            <LoadingIndicator />
          </View>
        </View>
      </View>
    )
  }
}
export default AppStartup
