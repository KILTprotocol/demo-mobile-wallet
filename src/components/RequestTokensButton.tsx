import React from 'react'
import { Linking } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import KiltButton from './KiltButton'
import { getRequestTokensUrl } from '../utils/utils.faucet'

type Props = {
  address: IPublicIdentity['address']
}

const RequestTokensButton: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <KiltButton
    title="⤵ Request tokens"
    onPress={() => {
      Linking.openURL(getRequestTokensUrl(address))
    }}
  />
)

export default RequestTokensButton
