import React from 'react'
import Dialog from 'react-native-dialog'
import { Text, View, ViewStyle } from 'react-native'
import QRCodeScanner from '../components/QRCodeScanner'
import { TXT_S_SIZE } from '../sharedStyles/styles.consts.typography'
import {
  dialogInputTxt,
  dialogContainer,
  dialogSection,
} from '../sharedStyles/styles.dialog'
import LoadingIndicator from '../components/LoadingIndicator'
import { AsyncStatus } from '../_enums'
import TxtCentered from '../components/TxtCentered'
import {
  txtSuccess,
  bodyTxt,
  txtError,
} from '../sharedStyles/styles.typography'
import {
  qrCodeScannerContainer,
  flexRowCenterLayout,
} from '../sharedStyles/styles.layout'

const contentContainer: ViewStyle = {
  height: 150,
  ...flexRowCenterLayout,
}

const recipientLabel: ViewStyle = {
  paddingBottom: 6,
}

type Props = {
  onPressCancel: () => void
  onConfirmTransfer: () => void
  onChangeTokenAmountToTransfer: (tokenAmountToTransfer: number) => void
  onTokenRecipientAddressRead: (address: string) => void
  tokenRecipientAddress: string
  visible: boolean
  transferAsyncStatus: AsyncStatus
}

class TokenTransferDialog extends React.Component<Props> {
  state = {
    // TODO set state as relevant apply styles to disabled btn
    isOkBtnDisabled: false,
  }

  render(): JSX.Element {
    const { isOkBtnDisabled } = this.state
    const {
      onChangeTokenAmountToTransfer,
      onTokenRecipientAddressRead,
      tokenRecipientAddress,
      onConfirmTransfer,
      onPressCancel,
      visible,
      transferAsyncStatus,
    } = this.props

    const form = (
      <>
        <Dialog.Input
          autoFocus
          keyboardType="decimal-pad"
          returnKeyType="done"
          style={dialogInputTxt}
          label="Amount to transfer (in KILT tokens):"
          onChangeText={tokenAmountToTransfer =>
            onChangeTokenAmountToTransfer(parseFloat(tokenAmountToTransfer))
          }
        />
        <View style={dialogSection}>
          <Text style={recipientLabel}>Recipient:</Text>
          <View>
            {tokenRecipientAddress ? (
              <Text style={{ fontSize: TXT_S_SIZE }}>
                {tokenRecipientAddress}
              </Text>
            ) : (
              <View style={qrCodeScannerContainer}>
                <QRCodeScanner
                  onBarCodeRead={barcode => {
                    onTokenRecipientAddressRead(barcode.data)
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </>
    )

    const statusToUiMapping = {
      [AsyncStatus.NotStarted]: {
        component: form,
      },
      [AsyncStatus.Pending]: {
        component: (
          <View style={contentContainer}>
            <LoadingIndicator />
          </View>
        ),
      },
      [AsyncStatus.Success]: {
        component: (
          <View style={contentContainer}>
            <TxtCentered style={[bodyTxt, txtSuccess]}>
              ✓ Transfer successful
            </TxtCentered>
          </View>
        ),
      },
      [AsyncStatus.Error]: {
        component: (
          <View style={contentContainer}>
            <TxtCentered style={[bodyTxt, txtError]}>
              ❌ Transfer failed
            </TxtCentered>
          </View>
        ),
      },
    }

    return (
      <Dialog.Container visible={visible} style={dialogContainer}>
        <Dialog.Title>Transfer KILT tokens</Dialog.Title>
        {statusToUiMapping[transferAsyncStatus].component}
        <Dialog.Button onPress={onPressCancel} label="Cancel" />
        <Dialog.Button
          onPress={onConfirmTransfer}
          label="Transfer tokens"
          disabled={isOkBtnDisabled}
        />
      </Dialog.Container>
    )
  }
}

export default TokenTransferDialog
