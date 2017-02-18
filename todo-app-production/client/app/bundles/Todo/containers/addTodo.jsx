import React from 'react'
import { connect } from 'react-redux'
import { Input } from '../Pure'
import actionCreators from '../actions/addTodoForm';

let AddTodo = ({ dispatch }) => (
  <form onSubmit={event => (event.preventDefault() && this.props.handleSubmit())}}>
      <input
        type="text"
        value={this.props.text}
        placeholder="Describe what you need to do here."
        onChange={event = > this.props.handleChange(event.target.value)} />
      <input className="hidden" type="submit" />
  </form>
);

function mapStateToProps(state) {
  return {
    text: state.$$store.get('addTodoForm'),
  };
}

AddTodoContainer = connect(mapStateToProps, actionCreators)(AddTodo);

export default AddTodoContainer;
