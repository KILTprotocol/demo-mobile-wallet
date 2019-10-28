import React from 'react'
import { Text, View, TextStyle } from 'react-native'
import Identicon from 'polkadot-identicon-react-native'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { flexRowLayout } from '../sharedStyles/styles.layout'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'

type Props = {
  address: IPublicIdentity['address']
}

const addressStyle: TextStyle = {
  paddingLeft: 24,
  paddingRight: 48,
}

const IdentityDisplay: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <Identicon value={address} size={48} theme="polkadot" />
    <Text style={[bodyTxt, addressStyle]}>{address}</Text>
  </View>
)

export default IdentityDisplay
