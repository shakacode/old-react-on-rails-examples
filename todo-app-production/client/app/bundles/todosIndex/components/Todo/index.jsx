// @flow
import React from 'react';
import css from './Todo.scss';

type Props = {
  id: number,
  completed: boolean,
  description: string,
  editTodo: Function,
  removeTodo: Function,
  toggleTodo: Function,
  editTodoDescription: Function,
};

const Todo = ({ id, completed, description, editTodo, toggleTodo, removeTodo, editTodoDescription }: Props) => (
  <div className="todo">
    <form
      onSubmit={event => {
        event.preventDefault();
        event.stopPropagation();
        editTodo({ id, description: event.target.firstChild.children[1].value });
      }}
    >
      <div className="input-group">
        <button type="button" className="input-group-addon" onClick={() => toggleTodo({ id, completed: !completed })}>
          {completed ? '\u270E' : '\u2713'}
        </button>
        <input
          type="text"
          value={description}
          className={`form-control ${completed ? css.completed : css.pending}`}
          onChange={event => editTodoDescription({ id, description: event.target.value })}
          aria-label="Enter todo description here"
        />
        <button type="button" className="input-group-addon" onClick={() => removeTodo({ id })}>{'\u2421'}</button>
      </div>
      <input className="hidden-xs-up" type="submit" />
    </form>
  </div>
);

export default Todo;
