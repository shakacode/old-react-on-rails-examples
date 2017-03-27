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
      todo => <Todo {...todo} onClick={toggleTodo} editTodo={editTodo} editTodoDescription={editTodoDescription} />,
      todos,
    )}
  </ul>
);

export default TodoList;
