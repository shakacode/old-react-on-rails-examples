// @flow
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo } from '../actions/todos';

const mapStateToProps = (state) => ({
  todos: state.get('todos'),
});

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  } });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
