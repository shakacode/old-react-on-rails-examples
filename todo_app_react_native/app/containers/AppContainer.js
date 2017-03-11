import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  Button,
  View,
} from 'react-native';
import TodosListView from '../components/TodosListView';
import { addTodo } from '../actions';
import styles from './AppContainerStyle';

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
            onChangeText={(text) => this.state.text = text}
            ref={(textInput) => this.textInput = textInput}
          />
          <Button
            style={styles.addButton}
            title="ADD"
            onPress={this.onAddButton}
          />
        </View>
        <TodosListView />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    visbilityFilter: state.visbilityFilter,
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
