// @flow
import React from 'react';
import css from './Todo.scss';

type Props = {
  id: number,
  completed: boolean,
  description: string,
  onClick: Function,
};

const Todo = ({ id, onClick, completed, description }: Props) => (
  <input
    onClick={() => onClick(id)}
    value={description}
    style={completed ? css.completed : css.pending}
  />
);

export default Todo;
