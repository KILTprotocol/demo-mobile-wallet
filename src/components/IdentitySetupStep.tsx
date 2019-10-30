import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bodyTxt } from '../sharedStyles/styles.typography'
import { flexRowLayout } from '../sharedStyles/styles.layout'
import {
  SUCCESS_CLR,
  TXT_LIGHT_CLR,
  ERROR_CLR,
  TXT_DEFAULT_CLR,
} from '../sharedStyles/styles.consts.colors'
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

const styles = StyleSheet.create({
  txtNotStarted: {
    color: TXT_LIGHT_CLR,
  },
  txtSuccess: {
    color: SUCCESS_CLR,
  },
  txtError: {
    color: ERROR_CLR,
  },
  txtPending: {
    color: TXT_DEFAULT_CLR,
  },
})

const statusToUiMapping = {
  [AsyncStatus.NotStarted]: {
    component: <TxtCentered />,
    txtStyle: styles.txtNotStarted,
  },
  [AsyncStatus.Pending]: {
    component: <LoadingIndicator />,
    txtStyle: styles.txtPending,
  },
  [AsyncStatus.Success]: {
    component: <TxtCentered>✓</TxtCentered>,
    txtStyle: styles.txtSuccess,
  },
  [AsyncStatus.Error]: {
    component: <TxtCentered>❌</TxtCentered>,
    txtStyle: styles.txtError,
  },
}

const IdentitySetupStep: React.FunctionComponent<Props> = ({
  description,
  status,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <View style={iconContainer}>{statusToUiMapping[status].component}</View>
    <Text style={[bodyTxt, statusToUiMapping[status].txtStyle]}>
      {description}
    </Text>
  </View>
)

export default IdentitySetupStep
