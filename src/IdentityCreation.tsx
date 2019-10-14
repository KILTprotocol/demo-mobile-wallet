import React, { useState, useEffect } from 'react'
import { Animated, View, Text, Button } from 'react-native'
import * as Kilt from '@kiltprotocol/sdk-js'
import {
  bodyEmphasizedTxt,
  bodyTxt,
  flexRowWrapLayout,
  mainViewContainer,
  sectionContainer,
  sectionTitleTxt,
} from './styles/sharedStyles'

const FadeInView = ({ style, delay, children }) => {
  const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: delay,
      duration: 1100,
    }).start()
  }, [])

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  )
}

class IdentityCreation extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // todo no back navigation
  render() {
    const { navigate } = this.props.navigation
    const mnemonic = Kilt.Identity.generateMnemonic()
    return (
      <View style={mainViewContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitleTxt}>Step 1: your identity</Text>
          <View delay={Math.random() * 100}>
            <View style={flexRowWrapLayout}>
              {mnemonic.split(' ').map(word => (
                <FadeInView delay={Math.random() * 900}>
                  <Text key={word} style={bodyEmphasizedTxt}>
                    {word}
                  </Text>
                </FadeInView>
              ))}
            </View>
          </View>
        </View>
        <View style={sectionContainer}>
          <Text style={bodyTxt}>
            Write this phrase down and keep it safe and secret. This is your
            KILT identity.
          </Text>
        </View>
        <Button
          title="OK, I wrote it down >"
          onPress={() => navigate('Preparation')}
        />
      </View>
    )
  }
}

export default IdentityCreation
