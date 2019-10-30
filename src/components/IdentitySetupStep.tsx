import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bodyTxt, bodyInvertedClrTxt } from '../sharedStyles/styles.typography'
import { flexRowLayout } from '../sharedStyles/styles.layout'
import {
  SUCCESS_CLR,
  TXT_LIGHT_CLR,
  ERROR_CLR,
  TXT_INVERTED_CLR,
  KILT_ORANGE_CLR,
  TXT_INVERTED_LIGHT_CLR,
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

/// todo move to typography
const styles = StyleSheet.create({
  txtNotStarted: {
    color: TXT_INVERTED_LIGHT_CLR,
  },
  txtSuccess: {
    color: SUCCESS_CLR,
  },
  txtError: {
    color: ERROR_CLR,
  },
  txtPending: {
    color: KILT_ORANGE_CLR,
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
    component: <TxtCentered style={styles.txtSuccess}>✓</TxtCentered>,
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
    <Text
      style={[bodyTxt, bodyInvertedClrTxt, statusToUiMapping[status].txtStyle]}>
      {description}
    </Text>
  </View>
)

export default IdentitySetupStep
