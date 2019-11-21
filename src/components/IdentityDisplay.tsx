import React from 'react'
import { View, ViewStyle } from 'react-native'
import { flexRowCenterLayout } from '../sharedStyles/styles.layout'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import AddressDisplay from './AddressDisplay'

type Props = {
  address: IPublicIdentity['address']
}

const addressWrapper: ViewStyle = {
  marginTop: 12,
  marginBottom: 6,
}

const IdentityDisplay: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <View style={flexRowCenterLayout}>
    <View style={addressWrapper}>
      <AddressDisplay address={address} />
    </View>
  </View>
)

export default IdentityDisplay
