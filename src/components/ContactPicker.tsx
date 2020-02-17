import React from 'react'
import { Picker } from 'react-native'
import { PublicIdentity } from '@kiltprotocol/sdk-js'
import { TContact } from '../types'
import { sPicker } from '../sharedStyles/styles.form'
import { truncateAddress } from '../utils/utils.formatting'

type Props = {
  contacts: TContact[]
  selectedAddress: PublicIdentity['address'] | null
  onChangeAddress: (address: string) => void
}

const itemStyle = {
  ...sPicker,
  textAlign: 'left',
}

const ContactPicker: React.FunctionComponent<Props> = ({
  contacts,
  selectedAddress,
  onChangeAddress,
}): JSX.Element => (
  <Picker
    itemStyle={itemStyle}
    style={sPicker}
    selectedValue={selectedAddress}
    onValueChange={onChangeAddress}
  >
    <Picker.Item label="(↓ Select a contact)" value={null} />
    {contacts.map(contact => (
      <Picker.Item
        label={`${contact.name}  (${truncateAddress(
          contact.publicIdentity.address,
          2
        )})${contact.publicIdentity.serviceAddress ? '📭' : ''}`}
        value={contact.publicIdentity.address}
      />
    ))}
  </Picker>
)

export default ContactPicker
