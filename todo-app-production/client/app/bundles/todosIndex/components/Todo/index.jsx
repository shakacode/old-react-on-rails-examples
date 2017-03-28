// @flow
import React from 'react';
import css from './Todo.scss';

type Props = {
  id: number,
  completed: boolean,
  description: string,
  onClick: Function,
  editTodo: Function,
  editTodoDescription: Function,
};

const Todo = ({ id, onClick, completed, description, editTodo, editTodoDescription }: Props) => (
  <form
    onSubmit={event => {
      event.preventDefault();
      event.stopPropagation();
      editTodo({ id, description: event.target.firstChild.value });
    }}
  >
    <input
      onClick={() => onClick(id)}
      value={description}
      style={completed ? css.completed : css.pending}
      onChange={event => editTodoDescription({ id, description: event.target.value })}
    />
    <input className="hidden-xs-up" type="submit" />
  </form>
);

export default Todo;
