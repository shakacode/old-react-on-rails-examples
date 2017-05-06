// @flow
import React from 'react';
import _ from 'lodash/fp';

import Todo from '../Todo';
import type { MappedTodo } from '../../types';

type Props = {
  todos: MappedTodo,
  editTodo: Function,
  removeTodo: Function,
  toggleTodo: Function,
  editTodoDescription: Function,
};

const TodoList = ({ todos, editTodo, removeTodo, toggleTodo, editTodoDescription }: Props) => (
  <ul>
    {_.map(
      todo => (
        <Todo
          key={todo.id}
          {...todo}
          editTodo={editTodo}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          editTodoDescription={editTodoDescription}
        />
      ),
      todos,
    )}
  </ul>
);

export default TodoList;
