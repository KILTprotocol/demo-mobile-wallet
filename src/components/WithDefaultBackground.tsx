import React from 'react'
import { ImageBackground } from 'react-native'
import { imgBckgrd } from '../sharedStyles/styles.layout'

const mainBckgrdImg = require('../assets/imgs/mainBckgrdImg.jpg')

const WithDefaultBackground: React.FunctionComponent = ({
  children,
}): JSX.Element => (
  <ImageBackground source={mainBckgrdImg} style={imgBckgrd}>
    {children}
  </ImageBackground>
)

export default WithDefaultBackground
