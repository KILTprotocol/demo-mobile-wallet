import React from 'react'
import { View } from 'react-native'
import { AsyncStatus, LoadingIndicatorSize } from '../_enums'
import { fixedHeight } from '../sharedStyles/styles.layout'
import Balance from './Balance'
import LoadingIndicator from './LoadingIndicator'

type Props = {
  balance: number
  asyncStatus: AsyncStatus
}

const BalanceLoadable: React.FunctionComponent<Props> = ({
  asyncStatus,
  balance,
}): JSX.Element => (
  <View style={fixedHeight}>
    {asyncStatus === AsyncStatus.Success && <Balance balance={balance} />}
    {asyncStatus === AsyncStatus.Pending && (
      <LoadingIndicator size={LoadingIndicatorSize.S} />
    )}
  </View>
)

export default BalanceLoadable
