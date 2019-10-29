import React from 'react'
import {
  Text,
  View,
  TextStyle,
  ImageBackground,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import { TXT_XS_SIZE } from '../sharedStyles/styles.consts.typography'
import { TXT_DEFAULT_CLR } from '../sharedStyles/styles.consts.colors'
import { imgBckgrd } from '../sharedStyles/styles.layout'
const kiltBckgrd = require('../assets/imgs/kiltBckgrd.jpg')

type Props = {
  title: string
}

const credentialTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_XS_SIZE,
  fontWeight: '600',
  marginBottom: 24,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: TXT_DEFAULT_CLR,
}

const credentialCard: ViewStyle = {
  shadowColor: '#000',
  height: 200,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.3,
  shadowRadius: 9,
  elevation: 16,
}

const imgBckgrdExtraStyles: ImageStyle = {
  borderRadius: 13,
}

const credentialCardContent: ViewStyle = {
  width: '100%',
  height: '100%',
  padding: 12,
}

const Credential: React.FunctionComponent<Props> = ({ title }): JSX.Element => (
  <View style={credentialCard}>
    <ImageBackground
      source={kiltBckgrd}
      style={imgBckgrd}
      imageStyle={imgBckgrdExtraStyles}>
      <View style={credentialCardContent}>
        <Text style={credentialTitleTxt}>{title}</Text>
      </View>
    </ImageBackground>
  </View>
)

export default Credential
