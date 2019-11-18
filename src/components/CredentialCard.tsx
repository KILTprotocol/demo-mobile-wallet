import React from 'react'
import {
  Text,
  View,
  TextStyle,
  ImageBackground,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import { TXT_S_SIZE } from '../sharedStyles/styles.consts.typography'
import {
  TXT_DEFAULT_CLR,
  TXT_LIGHT_CLR_NEUTRAL,
} from '../sharedStyles/styles.consts.colors'
import { imgBckgrd, flexRowLayout, card } from '../sharedStyles/styles.layout'
import { CredentialStatus } from '../_enums'
import CredentialStatusBadge from './CredentialStatusBadge'
import { bodyTxt } from '../sharedStyles/styles.typography'
const claimBckgrd = require('../assets/imgs/claimBckgrd.jpg')
const claimBckgrdValid = require('../assets/imgs/claimBckgrdValid.jpg')

type Props = {
  title: string
  status: CredentialStatus
  contents: object
}

const credentialTitleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_S_SIZE,
  fontWeight: '600',
  marginBottom: 12,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: TXT_DEFAULT_CLR,
}

const credentialCard: ViewStyle = {
  height: 200,
  ...card,
  shadowOpacity: 0.3,
}

const imgBckgrdExtraStyles: ImageStyle = {
  borderRadius: 13,
}

const credentialCardContentStyle: ViewStyle = {
  width: '100%',
  height: '100%',
  padding: 12,
}

const credentialPptiesStyle: ViewStyle = {
  marginTop: 12,
}

const pptyLabelStyle: TextStyle = {
  marginRight: 12,
  color: TXT_LIGHT_CLR_NEUTRAL,
  textTransform: 'capitalize',
}

const CredentialCard: React.FunctionComponent<Props> = ({
  title,
  status,
  contents,
}): JSX.Element => (
  <View style={credentialCard}>
    <ImageBackground
      source={
        status === CredentialStatus.Valid ? claimBckgrdValid : claimBckgrd
      }
      style={imgBckgrd}
      imageStyle={imgBckgrdExtraStyles}>
      <View style={credentialCardContentStyle}>
        <Text style={credentialTitleTxt}>{title}</Text>
        <CredentialStatusBadge status={status} />
        <View style={credentialPptiesStyle}>
          {Object.entries(contents).map(([pptyName, pptyValue]) => (
            <View key={pptyName} style={flexRowLayout}>
              <Text style={[bodyTxt, pptyLabelStyle]}>{pptyName}</Text>
              <Text style={bodyTxt}>{pptyValue}</Text>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  </View>
)

export default CredentialCard
