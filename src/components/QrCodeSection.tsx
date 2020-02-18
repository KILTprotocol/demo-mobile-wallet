import React from 'react'
import { View, Text } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { paddedVerticalS } from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { decodePublicIdentity } from '../utils/utils.encoding'
import { labelTxt } from '../sharedStyles/styles.form'
import Address from './Address'
import ContactForm from './ContactForm'
import QrCodeScanner from './QrCodeScanner'

type Props = {
  attesterPublicIdentity: PublicIdentity['address'] | null
  isAlreadyInContacts: boolean
  onChangeNewContactName: (name: string) => void
  onToggleShouldAddToContacts: (shouldAddToContacts: boolean) => void
  setPublicIdentity: (identity: PublicIdentity) => void
  shouldAddToContacts: boolean
}

const QrCodeSection: React.FunctionComponent<Props> = ({
  attesterPublicIdentity,
  isAlreadyInContacts,
  onChangeNewContactName,
  onToggleShouldAddToContacts,
  setPublicIdentity,
  shouldAddToContacts,
}): JSX.Element => {
  if (attesterPublicIdentity) {
    return (
      <>
        <View style={[paddedVerticalS]}>
          <Text style={[bodyTxt, labelTxt]}>Address:</Text>
          <Address address={attesterPublicIdentity.address} />
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
          const publicIdentity = decodePublicIdentity(publicIdentityEncoded)
          setPublicIdentity(publicIdentity)
        }}
      />
    )
  }
}

export default QrCodeSection
