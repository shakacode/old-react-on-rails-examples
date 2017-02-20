// @flow
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo } from '../actions/todos';

const mapStateToProps = (state) => ({ todos: state.todos.toJS() });

const actions = {
  onTodoClick: toggleTodo,
};

export default connect(mapStateToProps, actions)(TodoList);
