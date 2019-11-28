import React from 'react'
import Dialog from 'react-native-dialog'
import { Text, View, ViewStyle } from 'react-native'
import { dialogContainer, dialogSection } from '../sharedStyles/styles.dialog'
import LoadingIndicator from '../components/LoadingIndicator'
import { AsyncStatus } from '../_enums'
import TxtCentered from '../components/TxtCentered'
import {
  txtSuccess,
  bodyTxt,
  txtError,
  inputTxt,
} from '../sharedStyles/styles.typography'
import {
  qrCodeScannerContainer,
  flexRowCenterLayout,
} from '../sharedStyles/styles.layout'
import { disabledButton } from '../sharedStyles/styles.buttons'
import AddressDisplay from '../components/AddressDisplay'
import QrCodeScanner from '../components/QrCodeScanner'

const contentContainer: ViewStyle = {
  height: 150,
  ...flexRowCenterLayout,
  paddingBottom: 12,
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
  isOkBtnDisabled: boolean
  transferAsyncStatus: AsyncStatus
}

class TokenTransferDialog extends React.Component<Props> {
  processTokenAmountToTransfer(tokenAmountToTransfer: string): number {
    return parseFloat(tokenAmountToTransfer)
  }

  render(): JSX.Element {
    const {
      onChangeTokenAmountToTransfer,
      onTokenRecipientAddressRead,
      tokenRecipientAddress,
      onConfirmTransfer,
      onPressCancel,
      visible,
      transferAsyncStatus,
      isOkBtnDisabled,
    } = this.props

    const form = (
      <>
        <Dialog.Input
          autoFocus
          keyboardType="decimal-pad"
          returnKeyType="done"
          style={inputTxt}
          label="Amount to transfer (in KILT tokens):"
          onChangeText={tokenAmountToTransfer =>
            onChangeTokenAmountToTransfer(
              this.processTokenAmountToTransfer(tokenAmountToTransfer)
            )
          }
        />
        <View style={dialogSection}>
          <Text style={recipientLabel}>Recipient:</Text>
          <View>
            {tokenRecipientAddress ? (
              <AddressDisplay address={tokenRecipientAddress} />
            ) : (
              <View style={qrCodeScannerContainer}>
                <QrCodeScanner
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
        {transferAsyncStatus === AsyncStatus.NotStarted && (
          <Dialog.Button onPress={onPressCancel} label="Cancel" />
        )}
        {transferAsyncStatus === AsyncStatus.NotStarted && (
          <Dialog.Button
            onPress={onConfirmTransfer}
            label="Transfer tokens"
            style={isOkBtnDisabled ? disabledButton : {}}
            disabled={isOkBtnDisabled}
          />
        )}
      </Dialog.Container>
    )
  }
}

export default TokenTransferDialog
