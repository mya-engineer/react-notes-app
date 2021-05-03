import React, { useState } from 'react'
import { Column } from './kanban/Column'
import { DragDropContext } from 'react-beautiful-dnd'

export const KanbanBoard = () => {
  const data = {
    columns: [
      {
        id: 'column-1',
        title: 'Get Started',
        tasks: [
          { id: 'task-1', content: 'Hello, Kanban World!' },
          { id: 'task-2', content: 'Glad to meet You!' },
          { id: 'task-3', content: 'How are You?' },
          { id: 'task-4', content: 'Perfect BOARD!' },
        ],
      },
    ],
    columnOrder: ['column-1'],
  }

  const [columns, setColumns] = useState(data.columns)

  const dragHandler = result => {
    const { destination, source, draggableId } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }

    const srcColumn = columns.find(column => column.id == source.droppableId)
    const newTaskList = srcColumn.tasks
    const removedTask = newTaskList.splice(source.index, 1)
    newTaskList.splice(destination.index, 0, removedTask[0])

    const newColumn = {
      ...srcColumn,
      tasks: newTaskList,
    }

    setColumns(
      columns.map(column => {
        return column.id === srcColumn.id ? newColumn : column
      })
    )
  }

  return (
    <DragDropContext onDragEnd={dragHandler}>
      {columns.map(column => (
        <Column key={column.id} column={column} />
      ))}
    </DragDropContext>
  )
}
