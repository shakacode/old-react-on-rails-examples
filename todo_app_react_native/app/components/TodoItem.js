import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './TodoItemStyle';


export default class TodoItem extends Component {
  render() {
    const iconName =
      this.props.completed ? 'check-box' : 'check-box-outline-blank';
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: "#F8F8F8",
          borderBottomWidth: 1,
          borderColor: '#eee' }}
      >
        <View style={styles.todoSection}>
          <Icon.Button
            name={iconName}
            size={40}
            iconStyle={{ marginRight:0, marginLeft: -10 }}
            activeOpacity={1}
            borderRadius={5}
          >
            {this.props.text}
          </Icon.Button>
        </View>
      </TouchableHighlight>
    );
  }
}

TodoItem.propTypes = {
  text: React.PropTypes.string,
  completed: React.PropTypes.bool,
  onClick: React.PropTypes.function,
};
