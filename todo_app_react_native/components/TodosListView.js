import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';

// TODO: Make this into a ListView, for now just a ScrollView - much simpler

class TodosListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style = {styles.scrollSection}>
        { this.props.todos.map( (todo) => {
          return <TodoItem { ...todo } />
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  todoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function getVisibleTodos(todos, filter) {
    switch(filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
    }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosListView)
