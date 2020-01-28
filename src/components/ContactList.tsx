import React from 'react'
import { View, Text, TextStyle, ViewStyle } from 'react-native'
import {
  flexRow,
  flexRowSpaceBetween,
  card,
  flexRowCenter,
} from '../sharedStyles/styles.layout'
import { TContact } from '../types'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { CLR_TXT_INVERTED } from '../sharedStyles/styles.consts.colors'
import { MIN_SIZE_TOUCHABLE } from '../sharedStyles/styles.consts.touchable'
import {
  generateConstantColorFromStr,
  getFirstCharacter,
} from '../utils/utils.formatting'
import AddressDisplay from './AddressDisplay'

type Props = {
  contacts: TContact[]
}

const name: TextStyle = {
  marginRight: 12,
}

const badgeTxt: TextStyle = {
  color: CLR_TXT_INVERTED,
}

const contactCard: ViewStyle = {
  ...card,
  paddingHorizontal: 16,
  paddingVertical: 12,
  shadowOpacity: 0.1,
  marginBottom: 8,
}

const contactBadge: ViewStyle = {
  ...flexRowCenter,
  width: MIN_SIZE_TOUCHABLE,
  height: MIN_SIZE_TOUCHABLE,
  borderRadius: 200,
  marginRight: 12,
}

export default class ContactList extends React.Component<Props> {
  render(): JSX.Element {
    const { contacts } = this.props
    return (
      <>
        {contacts.map((contact: TContact) => (
          <View style={contactCard} key={contact.address}>
            <View style={flexRowSpaceBetween}>
              <View style={flexRow}>
                <View
                  style={[
                    contactBadge,
                    {
                      backgroundColor: generateConstantColorFromStr(
                        contact.address
                      ),
                    },
                  ]}>
                  <Text style={[bodyTxt, badgeTxt]}>
                    {getFirstCharacter(contact.name)}
                  </Text>
                </View>
                <Text style={[bodyTxt, name]}>{contact.name}</Text>
              </View>
              <AddressDisplay address={contact.address} />
            </View>
          </View>
        ))}
      </>
    )
  }
}
