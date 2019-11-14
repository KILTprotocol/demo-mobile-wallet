import React from 'react'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { View } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { connect } from 'react-redux'
import LoadingIndicator from '../components/LoadingIndicator'
import { APP, SETUP } from '../_routes'
import { mainViewContainer, fullCenter } from '../sharedStyles/styles.layout'
import { TAppState } from '../redux/reducers'
import { TMapStateToProps } from '../_types'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  publicIdentityFromStore: PublicIdentity | null
}

class AppStartup extends React.Component<Props> {
  componentDidMount(): void {
    this.bootstrapAsync()
  }

  bootstrapAsync = async () => {
    const { publicIdentityFromStore, navigation } = this.props
    // if an identity is already set up, navigate to the regular app
    // if not, navigate to the identity setup screen
    navigation.navigate(publicIdentityFromStore ? APP : SETUP)
  }

  render(): JSX.Element {
    return (
      <View style={mainViewContainer}>
        <View style={fullCenter}>
          <LoadingIndicator />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: TAppState): Partial<TMapStateToProps> => {
  return {
    publicIdentityFromStore: state.publicIdentityReducer.publicIdentity,
  }
}

export default connect(mapStateToProps, null)(AppStartup)
