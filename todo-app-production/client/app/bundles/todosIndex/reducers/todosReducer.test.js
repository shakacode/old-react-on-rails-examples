import { Map as $$Map, fromJS as $$fromJS } from 'immutable';
import * as actions from '../actions/todos';
import reducer from './todosReducer';

test('addTodo', () => {
  const state = $$fromJS({});
  const action = actions.addTodo({description: 'todo'});
  expect(reducer(state, action).toJS()).toEqual({"0": {description: 'todo',
                                                       completed: false,
                                                       temp: true}});
})

test('removeTodo', () => {
  const state = $$fromJS({0: 'wat'});
  const action = actions.removeTodoSuccess("0");
  expect(reducer(state, action)).toEqual($$Map());
})

describe('toggleTodo', () => {
  test('switches completed from true to false', () => {
    const state = $$fromJS({0: {description: 'todo', completed: true}});
    const action = actions.toggleTodo("0");
    expect(reducer(state, action)).toEqual($$fromJS({0: {description: 'todo', completed: false}}));
  })

  test('switches completed from false to true', () => {
    const state = $$fromJS({0: {description: 'todo', completed: false}});
    const action = actions.toggleTodo("0");
    expect(reducer(state, action)).toEqual($$fromJS({0: {description: 'todo', completed: true}}));
  })
})
