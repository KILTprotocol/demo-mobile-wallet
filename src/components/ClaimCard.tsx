import React from 'react'
import {
  Text,
  View,
  TextStyle,
  ImageBackground,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { CLAIM_HASH } from '../navigationParameters'
import { SEND_FOR_VERIFICATION } from '../routes'
import { TXT_S_SIZE } from '../sharedStyles/styles.consts.typography'
import { CLR_TXT } from '../sharedStyles/styles.consts.colors'
import {
  fill,
  card,
  flexRowEnd,
  flexRowSpaceBetween,
  paddedBottomS,
  flexColumnSpaceBetween,
} from '../sharedStyles/styles.layout'
import { ClaimStatus } from '../enums'
import ClaimStatusBadge from './ClaimStatusBadge'
import StyledButton from './StyledButton'
import ClaimProperty from './ClaimProperty'

const claimBckgrdPending = require('../assets/imgs/claimBckgrdPending.jpg')
const claimBckgrdValid = require('../assets/imgs/claimBckgrdValid.jpg')
const claimBckgrdRevoked = require('../assets/imgs/claimBckgrdRevoked.jpg')

type Props = {
  title: string
  status: ClaimStatus
  contents: object
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  claimHash: string
}

const titleTxt: TextStyle = {
  fontFamily: 'Montserrat-Bold',
  fontSize: TXT_S_SIZE,
  fontWeight: '600',
  letterSpacing: 2,
  textTransform: 'uppercase',
  color: CLR_TXT,
}

const claimCard: ViewStyle = {
  ...card,
  height: 200,
  borderRadius: 10,
  shadowOpacity: 0.3,
}

const bordered: ImageStyle = {
  borderRadius: 10,
}

const cardContent: ViewStyle = {
  padding: 12,
  ...flexColumnSpaceBetween,
}

const claimContents: ViewStyle = {
  marginTop: 12,
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
  navigation,
  claimHash,
}): JSX.Element => {
  // sort claim contents by name, alphanumerically
  const sortedClaimContents = [...Object.entries(contents)].sort(
    (entryA, entryB) => entryA[0].charCodeAt(0) - entryB[0].charCodeAt(0)
  )
  // a pending claim (= not yet checked by attesters) is not verifiable so its "Send to Verifier" button should be hidden
  const isVerifiable =
    status === ClaimStatus.Revoked || status === ClaimStatus.Valid
  return (
    <View style={claimCard}>
      <ImageBackground
        source={statusToUiMapping[status].imgSrc}
        style={fill}
        imageStyle={bordered}
      >
        <View style={[cardContent, fill]}>
          <View>
            <View style={[flexRowSpaceBetween, paddedBottomS]}>
              <Text style={titleTxt}>{title}</Text>
              <ClaimStatusBadge status={status} />
            </View>
            <View style={claimContents}>
              {sortedClaimContents.map(([propertyName, propertyValue]) => (
                <ClaimProperty
                  propertyName={propertyName}
                  propertyValue={propertyValue}
                  key={propertyName}
                />
              ))}
            </View>
          </View>
          {isVerifiable && (
            <View style={flexRowEnd}>
              <StyledButton
                title="→ Send to Verifier"
                onPress={() => {
                  navigation.navigate(SEND_FOR_VERIFICATION, {
                    [CLAIM_HASH]: claimHash,
                  })
                }}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

export default ClaimCard
