import React from 'react'
import { View, Text, TextStyle, ViewStyle } from 'react-native'
import {
  flexRowLayout,
  flexRowLayoutSpaceBetween,
  card,
  flexRowCenterLayout,
} from '../sharedStyles/styles.layout'
import { TContact } from '../_types'
import { bodyTxt } from '../sharedStyles/styles.typography'
import {
  TXT_LIGHT_CLR_NEUTRAL,
  TXT_INVERTED_CLR,
} from '../sharedStyles/styles.consts.colors'
import { MIN_SIZE_TOUCHABLE } from '../sharedStyles/styles.consts.touchable'
import {
  generateConstantColorFromStr,
  takeFirstLetter,
  truncateAddress,
} from '../utils/utils.formatting'

type Props = {
  contacts: TContact[]
}

const name: TextStyle = {
  marginRight: 12,
}

const badgeTxt: TextStyle = {
  color: TXT_INVERTED_CLR,
}

const address: TextStyle = {
  marginRight: 12,
  color: TXT_LIGHT_CLR_NEUTRAL,
}

// todo
// viewstyle vs stylesheet
// this vs nested styles
// dont append Style to styles
const contactCard: ViewStyle = {
  padding: 12,
  ...card,
  shadowOpacity: 0.1,
  marginBottom: 8,
}

const contactBadge: ViewStyle = {
  width: MIN_SIZE_TOUCHABLE,
  height: MIN_SIZE_TOUCHABLE,
  borderRadius: 200,
  marginRight: 12,
  ...flexRowCenterLayout,
}

export default class ContactList extends React.Component<Props> {
  render(): JSX.Element {
    const { contacts } = this.props
    return (
      <>
        {contacts.map((contact: TContact) => (
          <View style={contactCard} key={contact.address}>
            <View style={flexRowLayoutSpaceBetween}>
              <View style={flexRowLayout}>
                <View
                  style={[
                    contactBadge,
                    {
                      backgroundColor: generateConstantColorFromStr(
                        contact.name
                      ),
                    },
                  ]}>
                  <Text style={[bodyTxt, badgeTxt]}>
                    {takeFirstLetter(contact.name)}
                  </Text>
                </View>
                <Text style={[bodyTxt, name]}>{contact.name}</Text>
              </View>
              <Text style={[bodyTxt, address]}>
                {truncateAddress(contact.address)}
              </Text>
            </View>
          </View>
        ))}
      </>
    )
  }
}
