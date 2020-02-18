import React from 'react'
import { View, Text } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import {
  flexRowSpaceBetween,
  paddedBottomS,
  paddedRightXS,
} from '../sharedStyles/styles.layout'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { labelTxtUncapitalized, labelTxt } from '../sharedStyles/styles.form'
import StyledTextInput from './StyledTextInput'

type Props = {
  shouldAddToContacts: boolean
  onToggleShouldAddToContacts: (shouldAddToContacts: boolean) => void
  onChangeNewContactName: (name: string) => void
}

const ContactForm: React.FunctionComponent<Props> = ({
  shouldAddToContacts,
  onToggleShouldAddToContacts,
  onChangeNewContactName,
}): JSX.Element => (
  <>
    <View style={[flexRowSpaceBetween, paddedBottomS]}>
      <Text style={[bodyTxt, labelTxtUncapitalized, paddedRightXS]}>
        Add this attester to my contacts
      </Text>
      <View>
        <Switch
          value={shouldAddToContacts}
          onValueChange={onToggleShouldAddToContacts}
        />
      </View>
    </View>
    {shouldAddToContacts && (
      <>
        <Text style={[bodyTxt, labelTxt]}>Contact name:</Text>
        <StyledTextInput
          returnKeyType="done"
          onChangeText={onChangeNewContactName}
        />
      </>
    )}
  </>
)

export default ContactForm
