// @flow
import React from 'react';
import _ from 'lodash/fp';

import Todo from '../Todo';
import type { MappedTodo } from '../../types';

type Props = {
  todos: MappedTodo,
  toggleTodo: Function,
  editTodo: Function,
  editTodoDescription: Function,
};

const TodoList = ({ todos, toggleTodo, editTodo, editTodoDescription }: Props) => (
  <ul>
    {_.map(
      todo => (
        <Todo
          key={todo.id}
          {...todo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          editTodoDescription={editTodoDescription}
        />
      ),
      todos,
    )}
  </ul>
);

export default TodoList;
