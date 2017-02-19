// @flow
import { connect } from 'react-redux';
import AddTodoForm from '../components/AddTodoForm';
import * as actionCreators from '../actions/AddTodoForm';

const mapStateToProps = state => ({ text: state.AddTodoForm });

export default connect(mapStateToProps, actionCreators)(AddTodoForm);
