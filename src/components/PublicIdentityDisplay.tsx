import React from 'react'
import { View, Text } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { centered, paddedTopS } from '../sharedStyles/styles.layout'
import AccountProperty from './AccountProperty'
import PublicIdentityQrCode from './PublicIdentityQrCode'
import { encodePublicIdentity } from '../utils/utils.encoding'
import Address from './Address'
import { bodyTxt, monospaceTxt } from '../sharedStyles/styles.typography'

type Props = {
  publicIdentity: PublicIdentity
}

const PublicIdentityDisplay: React.FunctionComponent<Props> = ({
  publicIdentity,
}): JSX.Element => {
  const { address, serviceAddress } = publicIdentity
  return (
    <View>
      <View style={centered}>
        <PublicIdentityQrCode
          publicIdentityEncoded={encodePublicIdentity(publicIdentity)}
        />
      </View>
      <View>
        <View style={paddedTopS}>
          <AccountProperty propertyName="Address">
            <Address address={address} />
          </AccountProperty>
        </View>
        <View style={paddedTopS}>
          <AccountProperty propertyName="Messaging address">
            <Text style={[bodyTxt, monospaceTxt]}>{serviceAddress}</Text>
          </AccountProperty>
        </View>
      </View>
    </View>
  )
}

export default PublicIdentityDisplay
