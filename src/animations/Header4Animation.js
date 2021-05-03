import React from 'react'
import { useSpring, animated, config } from 'react-spring'

export const Header4Animation = ({ text }) => {
  const [props, set, stop] = useSpring(() => ({
    to: { opacity: 1, translateY: '0' },
    from: { opacity: 0, translateY: '-2rem' },
    config: config.gentle,
  }))

  return <animated.h4 style={props}>{text}</animated.h4>
}
