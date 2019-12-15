import React from 'react'
import { ImageBackground } from 'react-native'
import { fullWidthAndHeight } from '../sharedStyles/styles.layout'

const mainBckgrdImgDark = require('../assets/imgs/mainBckgrdImgDark.jpg')

const WithIntroBackground: React.FunctionComponent = ({
  children,
}): JSX.Element => (
  <ImageBackground source={mainBckgrdImgDark} style={fullWidthAndHeight}>
    {children}
  </ImageBackground>
)

export default WithIntroBackground
