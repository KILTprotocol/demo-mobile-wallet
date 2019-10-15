import React from 'react'
import { View, Text } from 'react-native'
import FadeInView from '../components/FadeInView'
import { flexRowWrapLayout } from '../sharedStyles/utils.layout'
import { bodyEmphasizedTxt } from '../sharedStyles/utils.typography'

type Props = {
  mnemonic: string
}

const Mnemonic: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => (
  <View style={flexRowWrapLayout}>
    {props.mnemonic.split(' ').map(word => (
      <FadeInView key={word} delay={Math.random() * 900} duration={1100}>
        <Text style={bodyEmphasizedTxt}>{word}</Text>
      </FadeInView>
    ))}
  </View>
)

export default Mnemonic
