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
import { ClaimStatus } from '../_enums'
import ClaimStatusBadge from './ClaimStatusBadge'
import { bodyTxt } from '../sharedStyles/styles.typography'
const claimBckgrdPending = require('../assets/imgs/claimBckgrdPending.jpg')
const claimBckgrdValid = require('../assets/imgs/claimBckgrdValid.jpg')
const claimBckgrdRevoked = require('../assets/imgs/claimBckgrdRevoked.jpg')

type Props = {
  title: string
  status: ClaimStatus
  contents: object
}

const titleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_S_SIZE,
  fontWeight: '600',
  marginBottom: 12,
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: CLR_TXT,
}

const claimCard: ViewStyle = {
  height: 200,
  borderRadius: 10,
  ...card,
  shadowOpacity: 0.3,
}

const bordered: ImageStyle = {
  borderRadius: 10,
}

const cardContent: ViewStyle = {
  padding: 12,
}

const claimProperties: ViewStyle = {
  marginTop: 12,
}

const label: TextStyle = {
  marginRight: 12,
  color: CLR_TXT_LIGHT,
  textTransform: 'capitalize',
}

const statusToUiMapping = {
  [ClaimStatus.AttestationPending]: {
    imgSrc: claimBckgrdPending,
  },
  [ClaimStatus.Valid]: {
    imgSrc: claimBckgrdValid,
  },
  [ClaimStatus.Revoked]: {
    imgSrc: claimBckgrdRevoked,
  },
}

const ClaimCard: React.FunctionComponent<Props> = ({
  title,
  status,
  contents,
}): JSX.Element => (
  <View style={claimCard}>
    <ImageBackground
      source={statusToUiMapping[status].imgSrc}
      style={fill}
      imageStyle={bordered}>
      <View style={[cardContent, fill]}>
        <Text style={titleTxt}>{title}</Text>
        <ClaimStatusBadge status={status} />
        <View style={claimProperties}>
          {[...Object.entries(contents)].map(
            ([propertyName, propertyValue]) => (
              <View key={propertyName} style={flexRow}>
                <Text style={[bodyTxt, label]}>{propertyName}</Text>
                <Text style={bodyTxt}>{propertyValue}</Text>
              </View>
            )
          )}
        </View>
      </View>
    </ImageBackground>
  </View>
)

export default ClaimCard
