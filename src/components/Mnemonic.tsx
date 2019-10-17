import React from 'react'
import { View, Text } from 'react-native'
import FadeInView from '../components/FadeInView'
import { flexRowWrapLayout } from '../sharedStyles/styles.layout'
import { bodyEmphasizedTxt } from '../sharedStyles/styles.typography'

type Props = {
  mnemonic: string
}

const TOTAL_ANIM_DURATION_MS = 1100
const MAX_DELAY_MS = 900

const Mnemonic: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => (
  <View style={flexRowWrapLayout}>
    {props.mnemonic.split(' ').map(word => (
      <FadeInView
        key={word}
        delay={Math.random() * MAX_DELAY_MS}
        duration={TOTAL_ANIM_DURATION_MS}>
        <Text style={bodyEmphasizedTxt}>{word}</Text>
      </FadeInView>
    ))}
  </View>
)

export default Mnemonic
