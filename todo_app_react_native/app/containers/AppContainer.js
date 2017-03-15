import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Button,
  View,
  ScrollView,
} from 'react-native';
import { addTodo } from '../actions';
import styles from './AppContainerStyle';
import TodoItem from '../components/TodoItem';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.textInput = null;
    this.onAddButton = this.onAddButton.bind(this);
  }

  onAddButton() {
    if (this.state.text !== '') {
      this.props.dispatch(addTodo(this.state.text));
      this.textInput.clear();
      this.state.text = '';
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TextInput
            style={styles.textInput}
            placeholder="What do you want to get done?"
            onChangeText={(text) => { this.state.text = text; }}
            ref={(textInput) => { this.textInput = textInput; }}
          />
          <Button
            style={styles.addButton}
            title="ADD"
            onPress={this.onAddButton}
          />
        </View>
        <ScrollView style={styles.scrollSection}>
          { this.props.todos.map((todo) => <TodoItem {...todo} />) }
        </ScrollView>
      </View>
    );
  }
}

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
    visbilityFilter: state.visbilityFilter,
    todos: getVisibleTodos(state.todos, state.visbilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
