import React from 'react'
import { ImageBackground, View, Image } from 'react-native'
import { fill, fillCenter } from '../sharedStyles/styles.layout'
import {
  LOGO_HORIZONTAL_WIDTH,
  LOGO_HORIZONTAL_HEIGHT,
} from '../_custom/config.styles'

const mainBckgrdImgDark = require('../assets/imgs/mainBckgrdImgDark.jpg')
const logo = require('../_custom/logo_horizontal.png')

const LockScreen: React.FunctionComponent = (): JSX.Element => (
  <ImageBackground source={mainBckgrdImgDark} style={fill}>
    <View style={fillCenter}>
      <Image
        style={{
          width: LOGO_HORIZONTAL_WIDTH,
          height: LOGO_HORIZONTAL_HEIGHT,
        }}
        source={logo}
      />
    </View>
  </ImageBackground>
)

export default LockScreen
