import React from 'react'
import { Linking } from 'react-native'
import KiltButton from './KiltButton'
import { getRequestTokensUrl } from '../utils/utils.faucet'

type Props = {
  address: string
}

// todo tab state
// todo bug identity asked twice on setup
const RequestTokensButton: React.FunctionComponent<Props> = ({
  address,
}): JSX.Element => (
  <KiltButton
    title="Request tokens"
    onPress={() => {
      Linking.openURL(getRequestTokensUrl(address))
    }}
  />
)

export default RequestTokensButton
