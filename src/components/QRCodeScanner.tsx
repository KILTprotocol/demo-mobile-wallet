import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'
import {
  CLR_BCKGRD_DARK,
  TXT_INVERTED_CLR,
} from '../sharedStyles/styles.consts.colors'
import { flexRowWrapLayout } from '../sharedStyles/styles.layout'

const styles = StyleSheet.create({
  cameraContainer: {
    width: '100%',
    height: '100%',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  hintContainer: {
    backgroundColor: CLR_BCKGRD_DARK,
    marginTop: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'center',
    position: 'absolute',
  },
  hint: {
    color: TXT_INVERTED_CLR,
  },
})

type Props = {
  onBarCodeRead: (barcode: any) => void
}

const QrCodeScanner: React.FunctionComponent<Props> = ({
  onBarCodeRead,
}): JSX.Element => (
  <View style={styles.cameraContainer}>
    <RNCamera
      style={styles.cameraPreview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      onBarCodeRead={barcode => onBarCodeRead(barcode)}
    />
    <View style={[styles.hintContainer, flexRowWrapLayout]}>
      <Text style={styles.hint}>Scan a KILT address QR code</Text>
    </View>
  </View>
)

export default QrCodeScanner
