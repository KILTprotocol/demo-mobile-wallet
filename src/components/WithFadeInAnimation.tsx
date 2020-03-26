import React, { useState } from 'react'
import { Animated } from 'react-native'

type Props = {
  style?: object
  delay: number
  duration: number
  children: object
}

const WithFadeInAnimation: React.FunctionComponent<Props> = ({
  style,
  delay,
  duration,
  children,
}): JSX.Element => {
  const initialOpacity = 0
  const [fadeAnim] = useState(new Animated.Value(initialOpacity))
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay,
      duration,
    }).start()
  })
  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  )
}

export default WithFadeInAnimation
