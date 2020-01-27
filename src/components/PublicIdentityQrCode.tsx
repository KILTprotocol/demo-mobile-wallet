import React from 'react'
import { View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { CLR_KILT_1_DARK } from '../sharedStyles/styles.consts.colors'
import { flexRowCenter } from '../sharedStyles/styles.layout'
const kiltLogoSquare = require('../assets/imgs/kiltLogoSquare.jpg')

type Props = {
  publicIdentity: PublicIdentity | null
}

const PublicIdentityQrCode: React.FunctionComponent<Props> = ({
  publicIdentity,
}): JSX.Element => (
  <View style={flexRowCenter}>
    <QRCode
      codeStyle="circle"
      content={JSON.stringify(publicIdentity || '')}
      color={CLR_KILT_1_DARK}
      size={220}
      logo={kiltLogoSquare}
      logoSize={50}
    />
  </View>
)

export default PublicIdentityQrCode
