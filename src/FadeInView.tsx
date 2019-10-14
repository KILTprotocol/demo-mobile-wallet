import React, { useState } from 'react'
import { Animated } from 'react-native'

const FadeInView: React.FunctionComponent<Props> = ({
  style,
  delay,
  duration,
  children,
}): JSX.Element => {
  const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: delay,
      duration: duration,
    }).start()
  }, [])

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  )
}

export default FadeInView
