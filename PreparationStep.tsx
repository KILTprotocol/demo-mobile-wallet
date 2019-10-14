import React from 'react'
import { View, Text } from 'react-native'
import { bodyTxt, sectionContainer, flexRowLayout, test3 } from './sharedStyles'
import { PulseIndicator } from 'react-native-indicators'
import { KILT_ORANGE_CLR } from './consts.colors'

type Props = {
  stepName: String
}

const indicatorStyle = {
  width: 24,
  marginRight: 12,
}

const PreparationStep: React.FunctionComponent<Props> = ({
  stepName,
}): JSX.Element => (
  <View style={flexRowLayout}>
    <View style={indicatorStyle}>
      <PulseIndicator color={KILT_ORANGE_CLR} />
    </View>
    <Text style={bodyTxt}>{stepName}...</Text>
  </View>
)

export default PreparationStep
