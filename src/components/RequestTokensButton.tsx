import React from 'react'
import { Linking } from 'react-native'
import { IPublicIdentity } from '@kiltprotocol/sdk-js'
import StyledButton from './StyledButton'
import { getRequestTokensUrl } from '../utils/utils.faucet'

type Props = {
  address: IPublicIdentity['address']
}

const RequestTokensButton: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <StyledButton
    title="⤵ Request tokens"
    onPress={() => {
      Linking.openURL(getRequestTokensUrl(address))
    }}
  />
)

export default RequestTokensButton
