// @flow
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import * as todosActions from '../actions/todos';

const mapStateToProps = state => ({ todos: state.todos.toJS() });

export default connect(mapStateToProps, todosActions)(TodoList);
