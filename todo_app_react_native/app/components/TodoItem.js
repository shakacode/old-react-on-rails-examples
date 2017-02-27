import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet
} from 'react-native';

export default class TodoItem extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <View style={styles.todoSection}>
        <Text style={styles.todoText}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  todoText: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor:
    'gray'
  },
});
