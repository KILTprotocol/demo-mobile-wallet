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
  // initial value for opacity: 0
  const [fadeAnim] = useState(new Animated.Value(0))
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: delay,
      duration: duration,
    }).start()
  })
  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  )
}

export default WithFadeInAnimation
