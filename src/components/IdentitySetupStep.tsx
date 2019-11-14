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
import { flexRowLayout } from '../sharedStyles/styles.layout'
import { AsyncStatus } from '../_enums'
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
    txtStyle: txtNotStarted,
  },
  [AsyncStatus.Pending]: {
    component: <LoadingIndicator />,
    txtStyle: txtPending,
  },
  [AsyncStatus.Success]: {
    component: <TxtCentered style={txtSuccess}>✓</TxtCentered>,
    txtStyle: txtSuccess,
  },
  [AsyncStatus.Error]: {
    component: <TxtCentered>❌</TxtCentered>,
    txtStyle: txtError,
  },
}

const IdentitySetupStep: React.FunctionComponent<Props> = ({
  description,
  status,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <View style={iconContainer}>{statusToUiMapping[status].component}</View>
    <Text
      style={[bodyTxt, bodyInvertedClrTxt, statusToUiMapping[status].txtStyle]}>
      {description}
    </Text>
  </View>
)

export default IdentitySetupStep
