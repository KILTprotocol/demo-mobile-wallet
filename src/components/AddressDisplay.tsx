import React from 'react'
import { Text, TextStyle } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { truncateAddress } from '../utils/utils.formatting'
import { TXT_LIGHT_CLR_NEUTRAL } from '../sharedStyles/styles.consts.colors'
import { bodyTxt } from '../sharedStyles/styles.typography'

type Props = {
  address: IPublicIdentity['address']
}

const addressStyle: TextStyle = {
  color: TXT_LIGHT_CLR_NEUTRAL,
  // Use a monospace font to ensure consistent length of the address display
  fontFamily: 'Courier',
}

const AddressDisplay: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <Text style={[bodyTxt, addressStyle]}>{truncateAddress(address)}</Text>
)

export default AddressDisplay
