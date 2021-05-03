import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { AlertContext } from '../context/alert/alertContext'

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext)
  const nodeRef = React.useRef(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={alert.visible}
      timeout={{
        enter: 500,
        exit: 350,
      }}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit>
      <div
        ref={nodeRef}
        className={`alert alert-${
          alert.type || 'warning'
        } alert-dismissible fade show`}>
        <strong>Attention!</strong>&nbsp;
        {alert.text}
        <button onClick={hide} type='button' className='close'>
          <span>&times;</span>
        </button>
      </div>
    </CSSTransition>
  )
}
