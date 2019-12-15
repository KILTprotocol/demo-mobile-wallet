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
import { CLR_TXT, CLR_TXT_LIGHT } from '../sharedStyles/styles.consts.colors'
import { fill, flexRow, card } from '../sharedStyles/styles.layout'
import { CredentialStatus } from '../_enums'
import CredentialStatusBadge from './CredentialStatusBadge'
import { bodyTxt } from '../sharedStyles/styles.typography'
const claimBckgrdPending = require('../assets/imgs/claimBckgrdPending.jpg')
const claimBckgrdValid = require('../assets/imgs/claimBckgrdValid.jpg')
const claimBckgrdRevoked = require('../assets/imgs/claimBckgrdRevoked.jpg')

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
  color: CLR_TXT,
}

const credentialCard: ViewStyle = {
  height: 200,
  borderRadius: 10,
  ...card,
  shadowOpacity: 0.3,
}

const bordered: ImageStyle = {
  borderRadius: 10,
}

const credentialCardContent: ViewStyle = {
  padding: 12,
}

const credentialPpties: ViewStyle = {
  marginTop: 12,
}

const pptyLabel: TextStyle = {
  marginRight: 12,
  color: CLR_TXT_LIGHT,
  textTransform: 'capitalize',
}

const statusToUiMapping = {
  [CredentialStatus.AttestationPending]: {
    imgSrc: claimBckgrdPending,
  },
  [CredentialStatus.Valid]: {
    imgSrc: claimBckgrdValid,
  },
  [CredentialStatus.Revoked]: {
    imgSrc: claimBckgrdRevoked,
  },
}

const CredentialCard: React.FunctionComponent<Props> = ({
  title,
  status,
  contents,
}): JSX.Element => (
  <View style={credentialCard}>
    <ImageBackground
      source={statusToUiMapping[status].imgSrc}
      style={fill}
      imageStyle={bordered}>
      <View style={[credentialCardContent, fill]}>
        <Text style={credentialTitleTxt}>{title}</Text>
        <CredentialStatusBadge status={status} />
        <View style={credentialPpties}>
          {/* todoprio fix ppty order display */}
          {/* todoprio ppty type input type */}
          {Object.entries(contents).map(([pptyName, pptyValue]) => (
            <View key={pptyName} style={flexRow}>
              <Text style={[bodyTxt, pptyLabel]}>{pptyName}</Text>
              <Text style={bodyTxt}>{pptyValue.toString()}</Text>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  </View>
)

export default CredentialCard
