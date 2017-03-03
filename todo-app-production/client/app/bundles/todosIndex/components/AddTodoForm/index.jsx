// @flow
import React from 'react';

type Props = {
  text: string,
  addTodo: Function,
  editAddTodoForm: Function,
};

const AddTodoForm = ({ text, addTodo, editAddTodoForm }: Props) => (
  <form onSubmit={event => event.preventDefault() && addTodo(event.target.value)}>
    <input
      type="text"
      value={text}
      placeholder="Describe what you need to do here."
      onChange={event => editAddTodoForm(event.target.value)}
    />
    <input className="hidden" type="submit" />
  </form>
);

export default AddTodoForm;
