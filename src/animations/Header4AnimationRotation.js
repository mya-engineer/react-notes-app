import React from 'react'
import { useSpring, animated } from 'react-spring'

export const Header4AnimationRotation = ({ text }) => {
  const [props, set, stop] = useSpring(() => ({
    to: { opacity: 1, scaleY: '1' },
    from: { opacity: 0, scaleY: '0' },
  }))

  return <animated.h4 style={props}>{text}</animated.h4>
}
