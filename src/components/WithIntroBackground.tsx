import React from 'react'
import { ImageBackground } from 'react-native'
import { imgBckgrd } from '../sharedStyles/styles.layout'

const imgDottedBckgrdDark = require('../assets/imgs/imgDottedBckgrdDark.jpg')

const WithIntroBackground: React.FunctionComponent = ({
  children,
}): JSX.Element => (
  <ImageBackground source={imgDottedBckgrdDark} style={imgBckgrd}>
    {children}
  </ImageBackground>
)

export default WithIntroBackground
