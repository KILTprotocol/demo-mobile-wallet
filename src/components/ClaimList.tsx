import React from 'react'
import { View } from 'react-native'
import { sectionContainer } from '../sharedStyles/styles.layout'
import ClaimCard from './ClaimCard'
import { TClaim } from '../_types'

type Props = {
  claims: TClaim[]
}

export default class ClaimList extends React.Component<Props> {
  render(): JSX.Element {
    const { claims } = this.props
    return (
      <View>
        {/* sort claims by creation date, newest on top */}
        {[
          ...claims.sort((claimA, claimB) =>
            claimA.requestTimestamp > claimB.requestTimestamp ? -1 : 1
          ),
        ].map((cred: TClaim) => (
          <View style={sectionContainer} key={cred.hash}>
            <ClaimCard
              title={cred.title}
              status={cred.status}
              contents={cred.contents}
            />
          </View>
        ))}
      </View>
    )
  }
}
