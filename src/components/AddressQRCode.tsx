import React from 'react'
import { View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes'
import { KILT_PURPLE_CLR_MEDIUM } from '../sharedStyles/styles.consts.colors'
import { flexRowCenterLayout } from '../sharedStyles/styles.layout'
const kiltLogoSquare = require('../assets/imgs/kiltLogoSquare.jpg')

type Props = {
  address: string
}

const AddressQRCode: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <View style={flexRowCenterLayout}>
    <QRCode
      codeStyle="circle"
      content={address}
      color={KILT_PURPLE_CLR_MEDIUM}
      size={200}
      logo={kiltLogoSquare}
      logoSize={60}
    />
  </View>
)

export default AddressQRCode
