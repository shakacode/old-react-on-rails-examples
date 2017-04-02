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

const Todo = ({ id, completed, description, editTodo, toggleTodo, editTodoDescription }: Props) => (
  <div className="todo">
    <form
      onSubmit={event => {
        event.preventDefault();
        event.stopPropagation();
        editTodo({ id, description: event.target.firstChild.value });
      }}
    >
      <input
        value={description}
        className={completed ? css.completed : css.pending}
        onChange={event => editTodoDescription({ id, description: event.target.value })}
      />
      <input className="hidden-xs-up" type="submit" />
    </form>
    <button onClick={() => toggleTodo(id)}>{completed ? 'revert to pending' : 'mark as completed'}</button>
  </div>
);

export default Todo;
