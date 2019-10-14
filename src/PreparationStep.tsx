import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bodyTxt, flexRowLayout } from './styles/sharedStyles'
import { StepStatus } from './enums'
import LoadingIndicator from './LoadingIndicator'
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

const mapping = {
  [StepStatus.NotStarted]: {
    component: <Text>.</Text>,
    txtStyle: styles.txtNotStarted,
  },
  [StepStatus.Pending]: {
    component: <LoadingIndicator />,
    txtStyle: styles.txtPending,
  },
  [StepStatus.Success]: {
    component: <Text>✅</Text>,
    txtStyle: styles.txtSuccess,
  },
  [StepStatus.Error]: {
    component: <Text>❌</Text>,
    txtStyle: styles.txtError,
  },
}

const PreparationStep: React.FunctionComponent<Props> = ({
  description,
  status,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <View style={iconContainer}>{mapping[status].component}</View>
    <Text style={[bodyTxt, mapping[status].txtStyle]}>{description}</Text>
  </View>
)

export default PreparationStep
