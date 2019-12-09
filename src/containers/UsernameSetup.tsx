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
  flexRowEndLayout,
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
  TXT_INVERTED_LIGHT_CLR_NEUTRAL,
  KILT_ORANGE_CLR,
  TXT_LIGHT_CLR_NEUTRAL,
} from '../sharedStyles/styles.consts.colors'
import { IDENTITY_SETUP } from '../_routes'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  setUsernameInStore: typeof setUsername
}

type State = {
  username: string
  isNextBtnDisabled: boolean
}

const usernameInputStyle: ViewStyle = {
  borderWidth: 1,
  borderColor: TXT_INVERTED_LIGHT_CLR_NEUTRAL,
  borderRadius: 8,
  paddingVertical: 18,
  paddingHorizontal: 12,
}

const labelStyle: TextStyle = {
  color: TXT_LIGHT_CLR_NEUTRAL,
  marginBottom: 6,
}

class UsernameSetup extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    isNextBtnDisabled: true,
  }

  onChangeUsername(username: string): void {
    const formattedUserName = username.trimLeft().trimRight()
    this.setState({
      username: formattedUserName,
      isNextBtnDisabled: !formattedUserName,
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
    const { isNextBtnDisabled } = this.state
    return (
      // todo font scaling in dialogs
      <WithIntroBackground>
        <ScrollView style={mainViewContainer}>
          <View style={sectionContainer}>
            <Text style={[sectionTitleTxt, titleInvertedClrTxt]}>Step 2</Text>
          </View>
          <View style={sectionContainer}>
            <Text style={[bodyTxt, labelStyle]}>Your first name</Text>
            <TextInput
              autoCorrect={false}
              autoFocus
              onChangeText={username => this.onChangeUsername(username)}
              returnKeyType="done"
              selectionColor={KILT_ORANGE_CLR}
              spellCheck={false}
              style={[bodyTxt, bodyInvertedClrTxt, usernameInputStyle]}
            />
          </View>
          <View style={sectionContainer}>
            <View style={flexRowEndLayout}>
              <KiltButton
                disabled={isNextBtnDisabled}
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