// @flow
import React from 'react';
import css from './Todo.scss';

type Props = {
  onClick: Function,
  completed: boolean,
  description: string,
};

const Todo = ({ onClick, completed, description }: Props) => (
  <input
    onClick={onClick}
    value={description}
    style={completed ? css.completed : css.pending}
  />
);

export default Todo;
