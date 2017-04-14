// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  TextInput,
  Button,
  View,
  ScrollView,
} from 'react-native';
import { addTodo, setVisbilityFilter, toggleTodo } from 'ror-common/actions/todos';
import styles from './AppContainerStyle';
import TodoItem from '../components/TodoItem';
import * as todoList from '../model/todoList';

type PropsType = {
  visbilityFilter: string,
  todos: Map,
  addTodo: Function,
  setVisbilityFilter: Function,
  toggleTodo: Function,
};

class AppContainer extends Component {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      text: '',
    };
    this.textInput = null;
  }

  onAddButton = () => {
    // if (this.state.text !== '') {
    //   this.props.addTodo(this.state.text);
    //   this.textInput.clear();
    //   this.state.text = '';
    // }
  }

  onListButton = () => {
    // this.props.setVisbilityFilter(
    //     todoList.getNextState(this.props.visbilityFilter));
  }

  onTodoClick = (todoId: number) => {
    // this.props.toggleTodo(todoId);
  }

  props: PropsType

  render = () => {
    // const filterButtonLabel = todoList.getNextState(this.props.visbilityFilter);
    return (
      <View style={styles.container}>
        <View flexDirection='column'>
          <View style={styles.topBar}>
            <TextInput
              style={styles.textInput}
              placeholder="What do you want to get done?"
              onChangeText={(text: string) => { this.state.text = text; }}
              ref={(textInput: string) => { this.textInput = textInput; }}
            />
            <Button
              style={styles.addButton}
              title="ADD"
              onPress={this.onAddButton}
            />
          </View>
          <ScrollView style={styles.scrollSection}>
            { this.props.todos.map(
              (todo) =>
                <TodoItem
                  {...todo}
                  onTodoClick={this.onTodoClick}
                  key={todo.id}
                />
              ) }
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
    // visbilityFilter: state.visbilityFilter,
    // todos: todoList.getVisibleTodos(state.todos, state.visbilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addTodo, setVisbilityFilter, toggleTodo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
