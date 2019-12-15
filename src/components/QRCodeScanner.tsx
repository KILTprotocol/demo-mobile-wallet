import React from 'react'
import { View, Text, TextStyle } from 'react-native'
import { RNCamera } from 'react-native-camera'
import {
  CLR_BCKGRD_DARK,
  TXT_INVERTED_CLR,
} from '../sharedStyles/styles.consts.colors'
import {
  flexRowWrapLayout,
  fullWidthAndHeight,
} from '../sharedStyles/styles.layout'

const hintContainer: TextStyle = {
  backgroundColor: CLR_BCKGRD_DARK,
  marginTop: 8,
  paddingHorizontal: 6,
  paddingVertical: 1,
  alignSelf: 'center',
  position: 'absolute',
}

const hint: TextStyle = {
  color: TXT_INVERTED_CLR,
}

// todoprio not request microphone
type Props = {
  onBarCodeRead: (barcode: any) => void
}

const QrCodeScanner: React.FunctionComponent<Props> = ({
  onBarCodeRead,
}): JSX.Element => (
  <View style={fullWidthAndHeight}>
    <RNCamera
      style={fullWidthAndHeight}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      onBarCodeRead={barcode => onBarCodeRead(barcode)}
    />
    <View style={[hintContainer, flexRowWrapLayout]}>
      <Text style={hint}>Scan a KILT address QR code</Text>
    </View>
  </View>
)

export default QrCodeScanner
