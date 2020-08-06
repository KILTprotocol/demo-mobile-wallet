import React from 'react'
import {
  View,
  NativeSyntheticEvent,
  NativeSegmentedControlIOSChangeEvent,
} from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { paddedVerticalM } from '../sharedStyles/styles.layout'
import StyledSegmentedControl from './StyledSegmentedControl'
import QrCodeSection from './QrCodeSection'
import ContactSection from './ContactSection'
import { TContact } from '../types'

const RECIPIENT_SELECTION_METHODS = ['Scan QR Code', 'Select from Contacts']

type Props = {
  publicIdentity: IPublicIdentity
  recipientSelectionMethod: number
  contacts: TContact[]
  shouldAddToContacts: boolean
  onToggleShouldAddToContacts: (shouldAdd: boolean) => void
  onChangeNewContactName: (name: string) => void
  setPublicIdentity: (publicIdentity: IPublicIdentity) => void
  setPublicIdentityFromContact: (contact: TContact) => void
  onChangeSelectionMethod: (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>,
  ) => void
}

const RecipientSelector: React.FunctionComponent<Props> = ({
  publicIdentity,
  recipientSelectionMethod,
  contacts,
  shouldAddToContacts,
  onToggleShouldAddToContacts,
  onChangeNewContactName,
  setPublicIdentity,
  setPublicIdentityFromContact,
  onChangeSelectionMethod,
}): JSX.Element => {
  const isAlreadyInContacts =
    publicIdentity &&
    contacts.some(c => c.publicIdentity.address === publicIdentity.address)

  const selector =
    recipientSelectionMethod === 0 ? (
      <QrCodeSection
        publicIdentity={publicIdentity}
        isAlreadyInContacts={isAlreadyInContacts}
        shouldAddToContacts={shouldAddToContacts}
        onToggleShouldAddToContacts={onToggleShouldAddToContacts}
        onChangeNewContactName={onChangeNewContactName}
        setPublicIdentity={setPublicIdentity}
      />
    ) : (
      <View style={paddedVerticalM}>
        <ContactSection
          contacts={contacts}
          selectedAddress={publicIdentity ? publicIdentity.address : null}
          onChangeAddress={address => {
            const contact = contacts.find(
              c => c.publicIdentity.address === address,
            )
            if (contact) {
              setPublicIdentityFromContact(contact)
            }
          }}
        />
      </View>
    )

  return (
    <>
      <StyledSegmentedControl
        values={RECIPIENT_SELECTION_METHODS}
        selectedIndex={recipientSelectionMethod}
        onChange={onChangeSelectionMethod}
      />
      {selector}
    </>
  )
}

export default RecipientSelector
