import React from 'react'
import { View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes'
import { flexRowCenter } from '../sharedStyles/styles.layout'
import { CONFIG_THEME } from '../config'
import { TPublicIdentityEncoded } from '../types'
const logo = require('../assets/imgs/logo/logo_square.jpg')

type Props = {
  publicIdentityEncoded: TPublicIdentityEncoded | null
}

const PublicIdentityQrCode: React.FunctionComponent<Props> = ({
  // the public identity must be encoded, to be small enough to fit in a mobile-readable QR Code
  publicIdentityEncoded,
}): JSX.Element => (
  <View style={flexRowCenter}>
    <QRCode
      codeStyle="circle"
      content={JSON.stringify(publicIdentityEncoded || '')}
      color={CONFIG_THEME.CLR_SECONDARY_DARK}
      size={220}
      logo={logo}
      logoSize={50}
    />
  </View>
)

export default PublicIdentityQrCode
