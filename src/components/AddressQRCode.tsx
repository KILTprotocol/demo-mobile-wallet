import React from 'react'
import { View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes'
import { CLR_KILT_1_DARK } from '../sharedStyles/styles.consts.colors'
import { flexRowCenter } from '../sharedStyles/styles.layout'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
const kiltLogoSquare = require('../assets/imgs/kiltLogoSquare.jpg')

type Props = {
  address: IPublicIdentity['address']
}

const AddressQrCode: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <View style={flexRowCenter}>
    <QRCode
      codeStyle="circle"
      content={address}
      color={CLR_KILT_1_DARK}
      size={160}
      logo={kiltLogoSquare}
      logoSize={60}
    />
  </View>
)

export default AddressQrCode
