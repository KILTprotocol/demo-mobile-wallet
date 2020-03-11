import React from 'react'
import { ViewStyle, View, Text, TextStyle } from 'react-native'
import { CONFIG_THEME } from '../config'
import {
  generateConstantColorFromStr,
  getFirstCharacter,
} from '../utils/utils.formatting'
import Address from './Address'
import { TContact } from '../types'
import {
  flexRowCenter,
  flexRowSpaceBetween,
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
  marginRight: 8,
}

const withMarginRight: TextStyle = {
  marginRight: 4,
}

const symbol: ViewStyle = {
  width: 24,
  marginRight: 12,
}

const badgeTxt: TextStyle = {
  color: CLR_TXT_INVERTED,
}

const Contact: React.FunctionComponent<Props> = ({ contact }): JSX.Element => {
  const { name, publicIdentity } = contact
  const { address, serviceAddress } = publicIdentity
  return (
    <View style={flexRowSpaceBetween}>
      <View style={flexRowSpaceBetween}>
        <View
          style={[
            contactBadge,
            {
              backgroundColor: generateConstantColorFromStr(address),
            },
          ]}
        >
          <Text style={[bodyTxt, badgeTxt]}>{getFirstCharacter(name)}</Text>
        </View>
        <View style={flexRowSpaceBetween}>
          <Text style={[bodyTxt, withMarginRight]}>{name}</Text>
          <View style={symbol}>
            {serviceAddress && (
              <Text style={bodyTxt}>{CONFIG_THEME.SYMBOL_SERVICE_ADDRESS}</Text>
            )}
          </View>
        </View>
      </View>

      <View>
        <Address address={address} />
      </View>
    </View>
  )
}

export default Contact
