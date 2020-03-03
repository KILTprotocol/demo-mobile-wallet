import React from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { truncateAddress } from '../utils/utils.formatting'
import { CLR_TXT_LIGHT } from '../sharedStyles/styles.consts.colors'
import { bodyTxt } from '../sharedStyles/styles.typography'

type Props = {
  address: IPublicIdentity['address']
}

const addressTxt: TextStyle = {
  color: CLR_TXT_LIGHT,
  // use a monospace font to ensure consistent length of the address display
  fontFamily: 'Courier',
}

const invisibleTxt: TextStyle = {
  color: 'transparent',
  overflow: 'hidden',
}

const shiftedUp: ViewStyle = {
  position: 'absolute',
  width: 160,
  height: 14,
}

const Address: React.FunctionComponent<Props> = ({ address }): JSX.Element => (
  <>
    <View>
      <Text style={[bodyTxt, addressTxt]}>{truncateAddress(address)}</Text>
    </View>
    {/* small hack to make the address selectable by the user
    we don't use ellipsis=middle because we want to see specifically the last 4 chars as checksum */}
    <View style={shiftedUp}>
      <Text style={invisibleTxt} selectable={true}>
        {address}
      </Text>
    </View>
  </>
)

export default Address
