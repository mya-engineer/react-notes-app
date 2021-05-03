import React from 'react'
import { useTransition, animated } from 'react-spring'

export const History = ({ history }) => {
  const transitions = useTransition(history, {
    keys: note => note.id,
    from: { opacity: 0, transform: 'scaleY(0)' },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: {
      opacity: 0,
      transform: 'scaleY(0)',
    },
    trail: 250,
  })

  return (
    <ul className='list-group'>
      {transitions((style, item) => (
        <animated.li
          style={style}
          key={item.id}
          className='list-group-item d-flex justify-content-between align-items-center'>
          <div>
            <strong
              style={{ marginRight: '1rem', textDecoration: 'line-through' }}>
              {item.title}
            </strong>
            <small>
              {new Date(Date.parse(item.date)).toLocaleString('ru')}
            </small>
          </div>
        </animated.li>
      ))}
    </ul>
  )
}
