// @flow
import React from 'react';

const AddTodoForm = ({ dispatch }) => (
  <form onSubmit={event => (event.preventDefault() && this.props.handleSubmit())}}>
      <input
        type="text"
        value={this.props.text}
        placeholder="Describe what you need to do here."
        onChange={event = > this.props.handleChange(event.target.value)} />
      <input className="hidden" type="submit" />
  </form>
);

export default AddTodoForm;
