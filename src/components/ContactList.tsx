import React from 'react'
import { FlatList, View, ViewStyle, Text } from 'react-native'
import { CONFIG_THEME } from '../config'
import { TContact } from '../types'
import { deleteContact } from '../redux/actions'
import Contact from './Contact'
import { CLR_BORDER } from '../sharedStyles/styles.consts.colors'
import { bodyTxt, emptyStateBodyTxt } from '../sharedStyles/styles.typography'
import { paddedBottomM, paddedVerticalM } from '../sharedStyles/styles.layout'

type Props = {
  contacts: TContact[]
  deleteContactOnClick: typeof deleteContact
}

const list: ViewStyle = {
  borderTopColor: CLR_BORDER,
  borderTopWidth: 1,
}

const contactContainer: ViewStyle = {
  backgroundColor: 'white',
  paddingVertical: 12,
  borderBottomColor: CLR_BORDER,
  borderBottomWidth: 1,
}

const ContactList: React.FunctionComponent<Props> = ({
  contacts,
  deleteContactOnClick,
}): JSX.Element => (
  <>
    {contacts.length > 0 ? (
      <>
        <View style={paddedBottomM}>
          <Text style={bodyTxt}>
            Contacts marked with {CONFIG_THEME.SYMBOL_SERVICE_ADDRESS} embed a
            messaging address
          </Text>
        </View>
        <FlatList
          style={list}
          data={contacts}
          renderItem={({ item }) => (
            <View style={contactContainer}>
              <Contact
                contact={item}
                deleteContactOnClick={deleteContactOnClick}
              />
            </View>
          )}
        />
      </>
    ) : (
      <View style={paddedVerticalM}>
        <Text style={emptyStateBodyTxt}>No contacts yet.</Text>
      </View>
    )}
  </>
)
export default ContactList
