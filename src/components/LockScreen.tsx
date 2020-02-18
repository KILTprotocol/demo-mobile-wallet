import React from 'react'
import { ImageBackground, View, Image } from 'react-native'
import { fill, fillCenter } from '../sharedStyles/styles.layout'
import { CONFIG_THEME } from '../config'

const mainBckgrdImgDark = require('../assets/imgs/mainBckgrdImgDark.jpg')
const logo = require('../assets/imgs/logo/logo_horizontal.png')

const LockScreen: React.FunctionComponent = (): JSX.Element => (
  <ImageBackground source={mainBckgrdImgDark} style={fill}>
    <View style={fillCenter}>
      <Image
        style={{
          width: CONFIG_THEME.LOGO_HORIZONTAL_WIDTH,
          height: CONFIG_THEME.LOGO_HORIZONTAL_HEIGHT,
        }}
        source={logo}
      />
    </View>
  </ImageBackground>
)

export default LockScreen
