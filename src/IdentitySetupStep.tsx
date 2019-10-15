import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bodyTxt } from './styles/utils.typography'
import { flexRowLayout } from './styles/utils.layout'
import { StepStatus } from './enums'
import LoadingIndicator from './sharedComponents/LoadingIndicator'
import {
  SUCCESS_CLR,
  TXT_LIGHT_CLR,
  ERROR_CLR,
  TXT_DEFAULT_CLR,
} from './styles/consts.colors'

type Props = {
  description: String
  status: StepStatus
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
  [StepStatus.NotStarted]: {
    component: <Text style={{ textAlign: 'center' }}></Text>,
    txtStyle: styles.txtNotStarted,
  },
  [StepStatus.Pending]: {
    component: <LoadingIndicator />,
    txtStyle: styles.txtPending,
  },
  [StepStatus.Success]: {
    component: <Text style={{ textAlign: 'center' }}>✅</Text>,
    txtStyle: styles.txtSuccess,
  },
  [StepStatus.Error]: {
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
