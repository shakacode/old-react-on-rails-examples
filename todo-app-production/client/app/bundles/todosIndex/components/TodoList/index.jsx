// @flow
import React from 'react';
import _ from 'lodash/fp';

import Todo from '../Todo';
import type { MappedTodo } from '../../types';

type Props = {
  todos: MappedTodo,
  onTodoClick: Function,
  editTodo: Function,
  editTodoDescription: Function,
};

const TodoList = ({ todos, onTodoClick, editTodo, editTodoDescription }: Props) => (
  <ul>
    {_.map(
      todo => <Todo {...todo} onClick={onTodoClick} editTodo={editTodo} editTodoDescription={editTodoDescription} />,
      todos,
    )}
  </ul>
);

export default TodoList;
