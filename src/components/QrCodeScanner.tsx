import React from 'react'
import { View, Text, TextStyle, ViewStyle } from 'react-native'
import { RNCamera } from 'react-native-camera'
import {
  CLR_BCKGRD_DARK,
  CLR_TXT_INVERTED,
} from '../sharedStyles/styles.consts.colors'
import { flexRowWrap, fill, centered } from '../sharedStyles/styles.layout'
import { TXT_XXS_SIZE } from '../sharedStyles/styles.consts.typography'

const hintContainer: TextStyle = {
  backgroundColor: CLR_BCKGRD_DARK,
  marginTop: 8,
  paddingHorizontal: 6,
  paddingVertical: 1,
  position: 'absolute',
  ...centered,
}

const hint: TextStyle = {
  color: CLR_TXT_INVERTED,
  fontSize: TXT_XXS_SIZE,
}

const qrCodeScannerContainer: ViewStyle = {
  height: 300,
  width: 300,
  ...centered,
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
        onBarCodeRead={barcode => {
          try {
            return onBarCodeRead(barcode)
          } catch (e) {
            console.warn(
              `Error when processing QR code data "${barcode.data}": ${e}`,
            )
          }
        }}
        captureAudio={false}
      />
      <View style={[hintContainer, flexRowWrap]}>
        <Text style={hint}>Scan a KILT public identity QR Code</Text>
      </View>
    </View>
  </View>
)

export default QrCodeScanner
