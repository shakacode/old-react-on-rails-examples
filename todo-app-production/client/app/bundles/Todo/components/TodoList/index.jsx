// @flow
import React from 'react';
import Todo from '../components/Todo';
import type { Todo } from '../types';

type Props = {
  todos: Array<Todo>,
  onTodoClick: Function,
}

const TodoList = (props: Props) => (
  <ul>
    {props.todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => props.onTodoClick(todo.id)}
      />
    )}
  </ul>
);

export default TodoList;
