import React from 'react'
import { FlatList, View, ViewStyle } from 'react-native'
import { TContact } from '../types'
import Contact from './Contact'
import { CLR_BORDER } from '../sharedStyles/styles.consts.colors'

type Props = {
  contacts: TContact[]
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

export default class ContactList extends React.Component<Props> {
  render(): JSX.Element {
    const { contacts } = this.props
    return (
      <>
        <FlatList
          style={list}
          data={contacts}
          renderItem={({ item }) => (
            <View style={contactContainer}>
              <Contact contact={item} />
            </View>
          )}
        />
      </>
    )
  }
}
