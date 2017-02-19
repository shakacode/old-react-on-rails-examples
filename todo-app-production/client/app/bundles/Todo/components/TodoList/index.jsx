// @flow
import React from 'react';
import Todo from '../Todo';
import type { MappedTodo } from '../../types';

type Props = {
  todos: MappedTodo,
  onTodoClick: Function,
};

const TodoList = ({ todos, onTodoClick }: Props) => (
  <ul>
    {todos.keys().map(id =>
      <Todo
        key={id}
        {...todos[id]}
        onClick={() => onTodoClick(id)}
      />,
    )}
  </ul>
);

export default TodoList;
