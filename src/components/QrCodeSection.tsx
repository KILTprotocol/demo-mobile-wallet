import React from 'react'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { View, Text } from 'react-native'
import QrCodeScanner from './QrCodeScanner'
import { paddedVerticalS } from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { decodePublicIdentity } from '../utils/utils.encoding'
import { labelTxt } from '../sharedStyles/styles.form'
import Address from './Address'
import ContactForm from './ContactForm'

type Props = {
  publicIdentity: PublicIdentity | null
  isAlreadyInContacts: boolean
  onChangeNewContactName: (name: string) => void
  onToggleShouldAddToContacts: (shouldAddToContacts: boolean) => void
  setPublicIdentity: (identity: PublicIdentity) => void
  shouldAddToContacts: boolean
}

const QrCodeSection: React.FunctionComponent<Props> = ({
  publicIdentity,
  isAlreadyInContacts,
  onChangeNewContactName,
  onToggleShouldAddToContacts,
  setPublicIdentity,
  shouldAddToContacts,
}): JSX.Element => {
  if (publicIdentity) {
    return (
      <>
        <View style={[paddedVerticalS]}>
          <Text style={[bodyTxt, labelTxt]}>Address:</Text>
          <Address address={publicIdentity.address} />
        </View>
        {!isAlreadyInContacts && (
          <ContactForm
            shouldAddToContacts={shouldAddToContacts}
            onToggleShouldAddToContacts={onToggleShouldAddToContacts}
            onChangeNewContactName={onChangeNewContactName}
          />
        )}
      </>
    )
  } else {
    return (
      <QrCodeScanner
        onBarCodeRead={barcode => {
          const publicIdentityEncoded = JSON.parse(barcode.data)
          const publicIdentityDecoded = decodePublicIdentity(
            publicIdentityEncoded,
          )
          setPublicIdentity(publicIdentityDecoded)
        }}
      />
    )
  }
}

export default QrCodeSection
