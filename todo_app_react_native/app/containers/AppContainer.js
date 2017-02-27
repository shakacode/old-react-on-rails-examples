import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';
import TodosListView from '../components/TodosListView';
import { addTodo } from '../actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._textInput = null;
    this.onAddButton = this.onAddButton.bind(this);
  }

  onAddButton() {
    if(this.state.text != '') {
      this.props.dispatch(addTodo(this.state.text));
      this._textInput.clear();
      this.state.text = '';
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = { styles.topBar }>
          <TextInput
            style = { styles.textInput }
            placeholder="What do you want to get done?"
            onChangeText={(text) => this.state.text = text}
            ref={(textInput) => this._textInput = textInput}
          />
          <Button
            style={ styles.addButton }
            title = 'ADD'
            onPress = { this.onAddButton }
          />
        </View>
        <TodosListView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 1
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    padding: 20
  },
  textInput: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: 'gray'
  },
  addButton: {
    flex: 1,
    height: 35
  },
  todosList: {
    flex:1,

  }
});

function mapStateToProps(state) {
  return {
    visbilityFilter: state.visbilityFilter,
    todos: state.todos,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
