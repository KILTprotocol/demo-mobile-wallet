import React from 'react'
import { Text, TextStyle } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import { truncateAddress } from '../utils/utils.formatting'
import { CLR_TXT_LIGHT } from '../sharedStyles/styles.consts.colors'
import { bodyTxt } from '../sharedStyles/styles.typography'

type Props = {
  address: IPublicIdentity['address']
}

const addressTxt: TextStyle = {
  color: CLR_TXT_LIGHT,
  // we use a monospace font to ensure consistent length of the address display
  fontFamily: 'Courier',
}

const AddressDisplay: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <Text style={[bodyTxt, addressTxt]}>{truncateAddress(address)}</Text>
)

export default AddressDisplay
