// @flow
import React from 'react';

type Props = {
  text: string,
  handleSubmit: Function,
  handleChange: Function,
};

const AddTodoForm = ({ text, handleSubmit, handleChange }: Props) => (
  <form onSubmit={event => (event.preventDefault() && handleSubmit())}>
    <input
      type="text"
      value={text}
      placeholder="Describe what you need to do here."
      onChange={event => handleChange(event.target.value)}
    />
    <input className="hidden" type="submit" />
  </form>
);

export default AddTodoForm;
