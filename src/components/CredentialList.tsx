import React from 'react'
import { View } from 'react-native'
import { TCredential } from '../redux/credentialsReducer'
import { sectionContainer } from '../sharedStyles/styles.layout'
import CredentialCard from './CredentialCard'

type Props = {
  credentials: TCredential[]
}

export default class CredentialList extends React.Component<Props> {
  render(): JSX.Element {
    const { credentials } = this.props
    return (
      <View>
        {credentials.map((cred: TCredential) => (
          <View style={sectionContainer} key={cred.hash}>
            <CredentialCard
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