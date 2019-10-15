import React from 'react'
import { flexRowWrapLayout } from './styles/utils.layout'
import { View, Text } from 'react-native'
import FadeInView from './sharedComponents/FadeInView'
import { bodyEmphasizedTxt } from './styles/utils.typography'

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
