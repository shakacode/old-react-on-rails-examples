// @flow
import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './TodoItemStyle';

type PropsType = {
  text: string,
  completed: bool,
  id: number,
  onTodoClick: Function,
};

export default class TodoItem extends Component {
  onTodoClick = () => {
    this.props.onTodoClick(this.props.id);
  }

  props: PropsType

  render = () => {
    const iconName =
      this.props.completed ? 'check-box' : 'check-box-outline-blank';
    const color = this.props.completed ? '#C5C8C9' : '#000';
    const textDecorationLine = this.props.completed ? 'line-through' : 'none';
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          paddingTop: 6,
          paddingBottom: 6,
          borderBottomWidth: 1,
          borderColor: '#eee' }}
      >
        <View style={styles.todoSection}>
          <Icon.Button
            name={iconName}
            color={color}
            size={40}
            iconStyle={{ marginRight: 0, marginLeft: -10 }}
            activeOpacity={1}
            borderRadius={5}
            backgroundColor='rgba(0,0,0,0)'
            underlayColor='rgba(0,0,0,0)'
            onPress={this.onTodoClick}
          />
          <Text
            style={{
              fontSize: 18,
              color: color,
              textDecorationLine: textDecorationLine
            }}
          >
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
