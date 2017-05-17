// @flow
import _ from 'lodash/fp';

import { createImmutableSelector } from '../libs/utils/selectors';

import type { State } from '../reducers';

const todosSelector = (state: State) => state.todos;

export function createTodosCompletedCountSelector() {
  return createImmutableSelector(todosSelector, _.flow(_.filter('completed'), _.size));
}

export function createTodosPendingCountSelector() {
  return createImmutableSelector(todosSelector, _.flow(_.filter(['completed', false]), _.size));
}

export function todosAsArraySelector() {
  return createImmutableSelector(todosSelector, todos => todos.toArray());
}
