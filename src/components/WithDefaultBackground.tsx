import React from 'react'
import { ImageBackground } from 'react-native'
import { fullWidthAndHeight } from '../sharedStyles/styles.layout'

const mainBckgrdImg = require('../assets/imgs/mainBckgrdImg.jpg')

const WithDefaultBackground: React.FunctionComponent = ({
  children,
}): JSX.Element => (
  <ImageBackground source={mainBckgrdImg} style={fullWidthAndHeight}>
    {children}
  </ImageBackground>
)

export default WithDefaultBackground
