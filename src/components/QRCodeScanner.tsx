import React from 'react'
import { View, Text, TextStyle } from 'react-native'
import { RNCamera } from 'react-native-camera'
import {
  CLR_BCKGRD_DARK,
  CLR_TXT_INVERTED,
} from '../sharedStyles/styles.consts.colors'
import { flexRowWrap, fill } from '../sharedStyles/styles.layout'

const hintContainer: TextStyle = {
  backgroundColor: CLR_BCKGRD_DARK,
  marginTop: 8,
  paddingHorizontal: 6,
  paddingVertical: 1,
  alignSelf: 'center',
  position: 'absolute',
}

const hint: TextStyle = {
  color: CLR_TXT_INVERTED,
}

const qrCodeScannerContainer: ViewStyle = {
  height: 200,
}

type Props = {
  onBarCodeRead: (barcode: any) => void
}

const QrCodeScanner: React.FunctionComponent<Props> = ({
  onBarCodeRead,
}): JSX.Element => (
  <View style={qrCodeScannerContainer}>
    <View style={fill}>
      <RNCamera
        style={fill}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onBarCodeRead={barcode => onBarCodeRead(barcode)}
        captureAudio={false}
      />
      <View style={[hintContainer, flexRowWrap]}>
        <Text style={hint}>Scan a KILT address QR code</Text>
      </View>
    </View>
  </View>
)

export default QrCodeScanner
