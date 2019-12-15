import React from 'react'
import { View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes'
import { KILT_PURPLE_CLR_MEDIUM } from '../sharedStyles/styles.consts.colors'
import { flexRowCenter } from '../sharedStyles/styles.layout'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
const kiltLogoSquare = require('../assets/imgs/kiltLogoSquare.jpg')

type Props = {
  address: IPublicIdentity['address']
}

// todo rename to Qr (or the other to QR)
const AddressQRCode: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <View style={flexRowCenter}>
    <QRCode
      codeStyle="circle"
      content={address}
      color={KILT_PURPLE_CLR_MEDIUM}
      size={160}
      logo={kiltLogoSquare}
      logoSize={60}
    />
  </View>
)

export default AddressQRCode
