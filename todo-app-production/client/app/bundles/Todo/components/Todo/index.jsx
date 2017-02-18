// @flow
import React from 'react'

type Props = {
  onClick: Function,
  completed: boolean,
  description: string,
}

const Todo = ({ onClick, completed, description }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {description}
  </li>
)

export default Todo
