import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './TodosListViewStyle';
import TodoItem from './TodoItem';
import { toggleTodo } from '../actions';

// TODO: Make this into a ListView, for now just a ScrollView - much simpler

class TodosListView extends Component {

  onTodoClick = () => {
    this.props.dispatch(toggleTodo(this.props.id));
  };

  render() {
    return (
      <ScrollView style={styles.scrollSection}>
        { this.props.todos.map((todo) => <TodoItem {...todo} onClick={this.onTodoClick} />) }
      </ScrollView>
    );
  }
}

TodosListView.propTypes = {
  todos: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      text: React.PropTypes.string,
      completed: React.PropTypes.bool })),
};

function getVisibleTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
}

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state.todos, state.visbilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosListView);
