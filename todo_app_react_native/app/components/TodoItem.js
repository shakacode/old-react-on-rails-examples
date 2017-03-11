import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './TodoItemStyle';


export default class TodoItem extends Component {
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

TodoItem.propTypes = {
  text: React.PropTypes.string,
};
