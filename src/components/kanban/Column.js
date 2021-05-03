import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

export const Column = ({ column }) => {
  return (
    <Droppable droppableId={column.id} key={column.id}>
      {provided => (
        <ul
          className='list-group shadow-sm'
          ref={provided.innerRef}
          {...provided.droppableProps}>
          <li className='list-group-item list-group-item-primary user-select-none list-group-item-action'>
            <h5 className='m-0'>{column.title}</h5>
          </li>
          {column.tasks.map((task, index) => (
            <Draggable draggableId={task.id} index={index} key={task.id}>
              {provided => (
                <li
                  className='list-group-item list-group-item-action'
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}>
                  <div>{task.content}</div>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}
