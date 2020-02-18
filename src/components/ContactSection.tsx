import React from 'react'
import { Text } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { emptyStateBodyTxt, bodyTxt } from '../sharedStyles/styles.typography'
import { TContact } from '../types'
import { labelTxt } from '../sharedStyles/styles.form'
import ContactPicker from './ContactPicker'

type Props = {
  contacts: TContact[]
  selectedAddress: PublicIdentity['address'] | null
  onChangeAddress: (address: string) => void
}

const ContactSection: React.FunctionComponent<Props> = ({
  contacts,
  selectedAddress,
  onChangeAddress,
}): JSX.Element => {
  if (contacts.length === 0) {
    return <Text style={emptyStateBodyTxt}>No contacts yet.</Text>
  }
  return (
    <>
      <Text style={[bodyTxt, labelTxt]}>Contacts:</Text>
      <ContactPicker
        contacts={contacts}
        selectedAddress={selectedAddress}
        onChangeAddress={onChangeAddress}
      />
    </>
  )
}

export default ContactSection
