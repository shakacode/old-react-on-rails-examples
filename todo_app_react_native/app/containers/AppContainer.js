import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Button,
  View,
  ScrollView,
} from 'react-native';
import { addTodo, setVisbilityFilter } from '../actions';
import styles from './AppContainerStyle';
import TodoItem from '../components/TodoItem';
import * as todoList from '../model/todoList';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.textInput = null;
  }

  onAddButton = () => {
    if (this.state.text !== '') {
      this.props.dispatch(addTodo(this.state.text));
      this.textInput.clear();
      this.state.text = '';
    }
  }

  onListButton = () => {
    this.props.dispatch(
      setVisbilityFilter(
        todoList.getNextState(this.props.visbilityFilter)
      ));
  };

  render() {
    const filterButtonLabel = todoList.getNextState(this.props.visbilityFilter);
    return (
      <View style={styles.container}>
        <View flexDirection='column'>
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
            { this.props.todos.map((todo) => <TodoItem {...todo} key={todo.id} />) }
          </ScrollView>
        </View>
        <Button
          style={styles.listButton}
          title={filterButtonLabel}
          onPress={this.onListButton}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    visbilityFilter: state.visbilityFilter,
    todos: todoList.getVisibleTodos(state.todos, state.visbilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
