// @flow
import { connect } from 'react-redux';

import AddTodoForm from '../components/AddTodoForm';
import { editAddTodoForm } from '../actions/forms';
import { addTodo } from '../actions/todos';

const mapStateToProps = state => ({ text: state.AddTodoForm });

export default connect(mapStateToProps, { editAddTodoForm, addTodo })(AddTodoForm);
