import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { useTransition, animated } from 'react-spring'

export const Notes = ({ notes, onRemove }) => {
  const alert = useContext(AlertContext)

  const transitions = useTransition(notes, {
    keys: note => note.id,
    from: { opacity: 0, transform: 'translate(0,2rem)' },
    enter: { opacity: 1, transform: 'translate(0,0%)' },
    leave: {
      opacity: 0,
      transform: 'translate(0,40px)',
      config: { tension: 300 },
    },
    trail: 100,
  })

  return (
    <ul className='list-group'>
      {transitions((style, item) => (
        <animated.li
          style={style}
          key={item.id}
          className='list-group-item d-flex justify-content-between align-items-center'>
          <div>
            <strong style={{ marginRight: '1rem' }}>{item.title}</strong>
            <small>
              {new Date(Date.parse(item.date)).toLocaleString('ru')}
            </small>
          </div>
          <button
            type='button'
            className='btn btn-danger btn-sm'
            onClick={() => {
              onRemove(item).then(() =>
                alert.show('Note has been removed!', 'danger')
              )
            }}>
            &times;
          </button>
        </animated.li>
      ))}
    </ul>
  )
}
