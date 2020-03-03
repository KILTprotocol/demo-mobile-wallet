import React from 'react'
import { View } from 'react-native'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import { sectionContainer } from '../sharedStyles/styles.layout'
import ClaimCard from './ClaimCard'
import { TClaim } from '../types'

type Props = {
  claims: TClaim[]
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const ClaimList: React.FunctionComponent<Props> = ({
  claims,
  navigation,
}): JSX.Element => {
  // sort claims by creation date, newest on top
  const sortedClaims = [
    ...claims.sort((claimA, claimB) =>
      claimA.requestTimestamp > claimB.requestTimestamp ? -1 : 1
    ),
  ]
  return (
    <>
      {sortedClaims.map((claim: TClaim) => (
        <View style={sectionContainer} key={claim.hash}>
          <ClaimCard
            title={claim.title}
            status={claim.status}
            contents={claim.contents}
            navigation={navigation}
            claimHash={claim.hash}
          />
        </View>
      ))}
    </>
  )
}

export default ClaimList
