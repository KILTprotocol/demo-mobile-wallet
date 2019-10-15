import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bodyTxt } from '../sharedStyles/utils.typography'
import { flexRowLayout } from '../sharedStyles/utils.layout'
import {
  SUCCESS_CLR,
  TXT_LIGHT_CLR,
  ERROR_CLR,
  TXT_DEFAULT_CLR,
} from '../sharedStyles/consts.colors'
import { AsyncStatus } from '../enums'
import LoadingIndicator from '../sharedComponents/LoadingIndicator'

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
    component: <Text style={{ textAlign: 'center' }}></Text>,
    txtStyle: styles.txtNotStarted,
  },
  [AsyncStatus.Pending]: {
    component: <LoadingIndicator />,
    txtStyle: styles.txtPending,
  },
  [AsyncStatus.Success]: {
    component: <Text style={{ textAlign: 'center' }}>✅</Text>,
    txtStyle: styles.txtSuccess,
  },
  [AsyncStatus.Error]: {
    component: <Text style={{ textAlign: 'center' }}>❌</Text>,
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
