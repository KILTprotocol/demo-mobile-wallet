import React from 'react'
import Dialog from 'react-native-dialog'
import { Text, View, ViewStyle } from 'react-native'
import { dialogContainer, dialogSection } from '../sharedStyles/styles.dialog'
import LoadingIndicator from '../components/LoadingIndicator'
import { AsyncStatus } from '../enums'
import TxtCentered from '../components/TxtCentered'
import {
  txtSuccess,
  bodyTxt,
  txtError,
} from '../sharedStyles/styles.typography'
import { flexRowCenter } from '../sharedStyles/styles.layout'
import { disabledButton } from '../sharedStyles/styles.buttons'
import AddressDisplay from '../components/AddressDisplay'
import QrCodeScanner from '../components/QrCodeScanner'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { CONFIG_THEME } from '../config'
import { inputTxt } from '../sharedStyles/styles.form'

const contentContainer: ViewStyle = {
  height: 150,
  ...flexRowCenter,
  paddingBottom: 12,
}

const recipientLabel: ViewStyle = {
  paddingBottom: 6,
}

type Props = {
  onPressCancel: () => void
  onConfirmTransfer: () => void
  onChangeTokenAmountToTransfer: (tokenAmountToTransfer: number) => void
  onTokenRecipientAddressRead: (address: IPublicIdentity['address']) => void
  tokenRecipientAddress: IPublicIdentity['address']
  visible: boolean
  isOkBtnDisabled: boolean
  transferAsyncStatus: AsyncStatus
}

class TokenTransferDialog extends React.Component<Props> {
  processTokenAmountToTransfer(tokenAmountToTransfer: string): number {
    return Number(tokenAmountToTransfer)
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
          label="Amount to transfer in KILT tokens (transaction cost = 1 Token):"
          returnKeyType="done"
          selectionColor={CONFIG_THEME.CLR_PRIMARY}
          style={inputTxt}
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
              <QrCodeScanner
                onBarCodeRead={barcode => {
                  onTokenRecipientAddressRead(barcode.data)
                }}
              />
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
