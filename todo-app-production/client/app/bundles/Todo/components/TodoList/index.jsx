// @flow
import React from 'react';
import _ from 'lodash/fp';

import Todo from '../Todo';
import type { MappedTodo } from '../../types';

type Props = {
  todos: MappedTodo,
  onTodoClick: Function,
};

const TodoList = ({ todos, onTodoClick }: Props) => (
  <ul>
    {_.map(todo => <Todo key={todo.id} {...todo} onClick={onTodoClick} />, todos)}
  </ul>
);

export default TodoList;
