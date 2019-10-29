import React from 'react'
import { ImageBackground } from 'react-native'
import { imgBckgrd } from '../sharedStyles/styles.layout'

const imgDottedBckgrd = require('../assets/imgs/imgDottedBckgrd.png')
// TODO create HOC for image
// TODO check file length

const WithDefaultBackground: React.FunctionComponent = ({
  children,
}): JSX.Element => (
  <ImageBackground source={imgDottedBckgrd} style={imgBckgrd}>
    {children}
  </ImageBackground>
)

export default WithDefaultBackground
