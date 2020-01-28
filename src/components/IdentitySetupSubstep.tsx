import React from 'react'
import { View, Text } from 'react-native'
import {
  bodyTxt,
  bodyInvertedClrTxt,
  txtNotStarted,
  txtPending,
  txtSuccess,
  txtError,
} from '../sharedStyles/styles.typography'
import { flexRow } from '../sharedStyles/styles.layout'
import { AsyncStatus } from '../enums'
import LoadingIndicator from '../components/LoadingIndicator'
import TxtCentered from './TxtCentered'

type Props = {
  description: String
  status: AsyncStatus
}

const iconContainer = {
  width: 24,
  marginRight: 12,
  textAlign: 'center',
}

const statusToUiMapping = {
  [AsyncStatus.NotStarted]: {
    component: <TxtCentered />,
    statusTxt: txtNotStarted,
  },
  [AsyncStatus.Pending]: {
    component: <LoadingIndicator />,
    statusTxt: txtPending,
  },
  [AsyncStatus.Success]: {
    component: <TxtCentered style={txtSuccess}>✓</TxtCentered>,
    statusTxt: txtSuccess,
  },
  [AsyncStatus.Error]: {
    component: <TxtCentered>❌</TxtCentered>,
    statusTxt: txtError,
  },
}

const IdentitySetupSubstep: React.FunctionComponent<Props> = ({
  description,
  status,
}): JSX.Element => (
  <View style={flexRow}>
    <View style={iconContainer}>{statusToUiMapping[status].component}</View>
    <Text
      style={[
        bodyTxt,
        bodyInvertedClrTxt,
        statusToUiMapping[status].statusTxt,
      ]}>
      {description}
    </Text>
  </View>
)

export default IdentitySetupSubstep
