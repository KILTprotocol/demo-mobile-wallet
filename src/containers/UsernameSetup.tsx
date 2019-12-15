import React from 'react'
import { View, TextInput, Text, ViewStyle, TextStyle } from 'react-native'
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
  sectionTitleTxt,
  bodyInvertedClrTxt,
  bodyTxt,
} from '../sharedStyles/styles.typography'
import {
  CLR_TXT_INVERTED,
  CLR_KILT_0,
  CLR_TXT_LIGHT,
} from '../sharedStyles/styles.consts.colors'
import { IDENTITY_SETUP } from '../_routes'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  setUsernameInStore: typeof setUsername
}

type State = {
  username: string
}

const input: ViewStyle = {
  borderWidth: 1,
  borderColor: CLR_TXT_INVERTED,
  borderRadius: 8,
  paddingVertical: 18,
  paddingHorizontal: 12,
}

const labelTxt: TextStyle = {
  color: CLR_TXT_LIGHT,
  marginBottom: 6,
}

class UsernameSetup extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
  }

  onChangeUsername(username: string): void {
    const formattedUserName = username.trimLeft().trimRight()
    this.setState({
      username: formattedUserName,
    })
  }

  saveUsernameAndGoNext(): void {
    const { navigation, setUsernameInStore } = this.props
    const { username } = this.state
    // todo then
    setUsernameInStore(username)
    navigation.navigate(IDENTITY_SETUP)
  }

  render(): JSX.Element {
    return (
      <WithIntroBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[sectionTitleTxt, titleInvertedClrTxt]}>
              Step 2 (optional)
            </Text>
          </View>
          <View style={sectionContainer}>
            <Text style={[bodyTxt, labelTxt]}>Your first name (optional)</Text>
            <TextInput
              autoCorrect={false}
              autoFocus
              onChangeText={username => this.onChangeUsername(username)}
              returnKeyType="done"
              selectionColor={CLR_KILT_0}
              spellCheck={false}
              style={[bodyTxt, bodyInvertedClrTxt, input]}
            />
          </View>
          <View style={sectionContainer}>
            <View style={flexRowEnd}>
              <KiltButton
                title="Next >"
                onPress={() => this.saveUsernameAndGoNext()}
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
