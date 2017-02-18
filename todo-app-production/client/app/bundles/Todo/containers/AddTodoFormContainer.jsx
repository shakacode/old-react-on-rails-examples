// @flow
import { connect } from 'react-redux';
import AddTodoForm from '../components/AddTodoForm';
import actionCreators from '../actions/AddTodoForm';

function mapStateToProps(state) {
  return {
    text: state.get('AddTodoForm'),
  };
}

export default connect(mapStateToProps, actionCreators)(AddTodoForm);
