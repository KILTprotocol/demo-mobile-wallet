import React from 'react'
import { ViewStyle, View, Text, TextStyle } from 'react-native'
import {
  generateConstantColorFromStr,
  getFirstCharacter,
} from '../utils/utils.formatting'
import Address from './Address'
import { TContact } from '../types'
import {
  flexRowCenter,
  flexRowSpaceBetween,
  flexRow,
} from '../sharedStyles/styles.layout'
import { MIN_SIZE_TOUCHABLE } from '../sharedStyles/styles.consts.touchable'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { CLR_TXT_INVERTED } from '../sharedStyles/styles.consts.colors'

type Props = {
  contact: TContact
}

const contactBadge: ViewStyle = {
  ...flexRowCenter,
  width: MIN_SIZE_TOUCHABLE,
  height: MIN_SIZE_TOUCHABLE,
  borderRadius: 200,
  marginRight: 12,
}

const name: TextStyle = {
  marginRight: 12,
}

const badgeTxt: TextStyle = {
  color: CLR_TXT_INVERTED,
}

const Contact: React.FunctionComponent<Props> = ({ contact }): JSX.Element => (
  <View style={flexRowSpaceBetween}>
    <View style={flexRow}>
      <View
        style={[
          contactBadge,
          {
            backgroundColor: generateConstantColorFromStr(
              contact.publicIdentity.address
            ),
          },
        ]}>
        <Text style={[bodyTxt, badgeTxt]}>
          {getFirstCharacter(contact.name)}
        </Text>
      </View>
      <Text style={[bodyTxt, name]}>{contact.name}</Text>
      <Text style={[bodyTxt, name]}>
        {contact.publicIdentity.serviceAddress}
      </Text>
    </View>
    <Address address={contact.publicIdentity.address} />
  </View>
)

export default Contact
