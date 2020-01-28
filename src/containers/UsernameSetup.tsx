import React from 'react'
import { View, TextInput, Text } from 'react-native'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import KiltButton from '../components/KiltButton'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation'
import {
  mainViewContainer,
  sectionContainer,
  flexRowEnd,
} from '../sharedStyles/styles.layout'
import { setUsername } from '../redux/actions'
import { TMapDispatchToProps } from '../_types'
import WithIntroBackground from '../components/WithIntroBackground'
import {
  titleInvertedClrTxt,
  h2,
  bodyInvertedClrTxt,
  bodyTxt,
} from '../sharedStyles/styles.typography'
import { MNEMONIC_CREATION } from '../_routes'
import { CLR_PRIMARY } from '../_custom/theme'
import { labelTxt, input } from '../sharedStyles/styles.form'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  setUsernameInStore: typeof setUsername
}

type State = {
  username: string
}

class UsernameSetup extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
  }

  onChangeUsername(username: string): void {
    const formattedUsername = username.trimLeft().trimRight()
    this.setState({
      username: formattedUsername,
    })
  }

  saveUsernameAndNavigateNext(): void {
    const { navigation, setUsernameInStore } = this.props
    const { username } = this.state
    setUsernameInStore(username)
    navigation.navigate(MNEMONIC_CREATION)
  }

  render(): JSX.Element {
    return (
      <WithIntroBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[h2, titleInvertedClrTxt]}>Step 1 (optional)</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={[bodyTxt, labelTxt]}>Your first name (optional)</Text>
            <TextInput
              autoCorrect={false}
              autoFocus
              onChangeText={username => this.onChangeUsername(username)}
              returnKeyType="done"
              selectionColor={CLR_PRIMARY}
              spellCheck={false}
              style={[bodyTxt, bodyInvertedClrTxt, input]}
            />
          </View>
          <View style={sectionContainer}>
            <View style={flexRowEnd}>
              <KiltButton
                title="Next >"
                onPress={() => this.saveUsernameAndNavigateNext()}
              />
            </View>
          </View>
        </ScrollView>
      </WithIntroBackground>
    )
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch
): Partial<TMapDispatchToProps> => {
  return {
    setUsernameInStore: (username: string) => {
      dispatch(setUsername(username))
    },
  }
}

export default connect(null, mapDispatchToProps)(UsernameSetup)
