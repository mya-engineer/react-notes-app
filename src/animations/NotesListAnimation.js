import React from 'react'
import { useTrail, animated, config } from 'react-spring'

export const NotesListAnimation = ({ children }) => {
  const [props, set, stop] = useTrail(() => ({
    to: { opacity: 1, translateY: '0' },
    from: { opacity: 0, translateY: '2rem' },
    config: config.wobbly,
  }))

  return (
    <animated.ul style={props} className='list-group'>
      {children}
    </animated.ul>
  )
}
