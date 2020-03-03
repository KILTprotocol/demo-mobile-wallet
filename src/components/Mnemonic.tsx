import React from 'react'
import { View, Text } from 'react-native'
import WithFadeInAnimation from './WithFadeInAnimation'
import { flexRowWrap } from '../sharedStyles/styles.layout'
import { bodyEmphasizedTxt } from '../sharedStyles/styles.typography'

type Props = {
  mnemonic: string
}

const TOTAL_ANIM_DURATION_MS = 1100
const MAX_DELAY_MS = 900

const Mnemonic: React.FunctionComponent<Props> = ({
  mnemonic,
}): JSX.Element => (
  <View style={flexRowWrap}>
    {mnemonic.split(' ').map(word => (
      <WithFadeInAnimation
        key={word}
        delay={Math.random() * MAX_DELAY_MS}
        duration={TOTAL_ANIM_DURATION_MS}
      >
        <Text style={bodyEmphasizedTxt}>{word}</Text>
      </WithFadeInAnimation>
    ))}
  </View>
)

export default Mnemonic
