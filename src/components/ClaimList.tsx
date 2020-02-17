import React from 'react'
import { View } from 'react-native'
import { sectionContainer } from '../sharedStyles/styles.layout'
import ClaimCard from './ClaimCard'
import { TClaim } from '../types'

type Props = {
  claims: TClaim[]
}

const ClaimList: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { claims } = props
  // sort claims by creation date, newest on top
  const sortedClaims = [
    ...claims.sort((claimA, claimB) => claimA.requestTimestamp > claimB.requestTimestamp ? -1 : 1),
  ]
  return (
    <>
      {sortedClaims.map((claim: TClaim) => (
        <View style={sectionContainer} key={claim.hash}>
          <ClaimCard
            title={claim.title}
            status={claim.status}
            contents={claim.contents}
          />
        </View>
      ))}
    </>
  )
}

export default ClaimList
