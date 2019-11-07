import React from 'react'
import { ImageBackground } from 'react-native'
import { imgBckgrd } from '../sharedStyles/styles.layout'

const mainBckgrdImgDark = require('../assets/imgs/mainBckgrdImgDark.jpg')

const WithIntroBackground: React.FunctionComponent = ({
  children,
}): JSX.Element => (
  <ImageBackground source={mainBckgrdImgDark} style={imgBckgrd}>
    {children}
  </ImageBackground>
)

export default WithIntroBackground
