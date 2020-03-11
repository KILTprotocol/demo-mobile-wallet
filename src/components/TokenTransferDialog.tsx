import React from 'react'
import Dialog from 'react-native-dialog'
import { Text, View, ViewStyle } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { dialogContainer, dialogSection } from '../sharedStyles/styles.dialog'
import LoadingIndicator from './LoadingIndicator'
import { AsyncStatus } from '../enums'
import TxtCentered from './TxtCentered'
import {
  txtSuccess,
  bodyTxt,
  txtError,
} from '../sharedStyles/styles.typography'
import { flexRowCenter } from '../sharedStyles/styles.layout'
import { disabledButton } from '../sharedStyles/styles.buttons'
import Address from './Address'
import QrCodeScanner from './QrCodeScanner'
import { labelTxt } from '../sharedStyles/styles.form'
import StyledTextInput from './StyledTextInput'

const contentContainer: ViewStyle = {
  height: 150,
  ...flexRowCenter,
  paddingBottom: 12,
}

type Props = {
  onPressCancel: () => void
  onConfirmTransfer: () => void
  onChangeTokenAmountToTransfer: (tokenAmountToTransfer: number) => void
  onRecipientPublicIdentityRead: (address: IPublicIdentity['address']) => void
  tokenRecipientAddress: IPublicIdentity['address']
  visible: boolean
  isOkBtnDisabled: boolean
  transferAsyncStatus: AsyncStatus
}

const TokenTransferDialog: React.FunctionComponent<Props> = ({
  onChangeTokenAmountToTransfer,
  onRecipientPublicIdentityRead,
  tokenRecipientAddress,
  onConfirmTransfer,
  onPressCancel,
  visible,
  transferAsyncStatus,
  isOkBtnDisabled,
}): JSX.Element => {
  const form = (
    <>
      <View style={dialogSection}>
        <Text style={[bodyTxt, labelTxt]}>
          Amount to transfer (+ transaction cost = 1 Token):
        </Text>
        <StyledTextInput
          autoFocus
          keyboardType="decimal-pad"
          returnKeyType="done"
          onChangeText={tokenAmountToTransfer =>
            onChangeTokenAmountToTransfer(Number(tokenAmountToTransfer))
          }
        />
      </View>
      <View style={dialogSection}>
        <Text style={[bodyTxt, labelTxt]}>Recipient:</Text>
        <View>
          {tokenRecipientAddress ? (
            <Address address={tokenRecipientAddress} />
          ) : (
            <QrCodeScanner
              onBarCodeRead={barcode => {
                onRecipientPublicIdentityRead(barcode.data)
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

export default TokenTransferDialog
