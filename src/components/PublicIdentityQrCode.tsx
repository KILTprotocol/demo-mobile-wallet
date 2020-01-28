import React from 'react'
import { View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { flexRowCenter } from '../sharedStyles/styles.layout'
import { CONFIG_THEME } from '../config'
const logo = require('../assets/imgs/logo/logo_square.jpg')

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
      color={CONFIG_THEME.CLR_SECONDARY_DARK}
      size={220}
      logo={logo}
      logoSize={50}
    />
  </View>
)

export default PublicIdentityQrCode
