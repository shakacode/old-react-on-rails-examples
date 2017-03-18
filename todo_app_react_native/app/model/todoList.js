export const SHOW_ALL = 'Show All';
export const SHOW_COMPLETED = 'Show Completed';
export const SHOW_ACTIVE = 'Show Active';

export const todoFilterOrder = [
  SHOW_ACTIVE,
  SHOW_COMPLETED,
  SHOW_ALL,
];

const todosFilters = {
  [SHOW_ALL](todos) {
    return todos;
  },
  [SHOW_COMPLETED](todos) {
    return todos.filter(t => t.completed);
  },
  [SHOW_ACTIVE](todos) {
    return todos.filter(t => !t.completed);
  },
};

const nextState = {
  [SHOW_ALL]() {
    return SHOW_ACTIVE;
  },
  [SHOW_ACTIVE]() {
    return SHOW_COMPLETED;
  },
  [SHOW_COMPLETED]() {
    return SHOW_ALL;
  },
};

export function getVisibleTodos(todos, filter) {
  if (todosFilters.hasOwnProperty(filter)) {
    return todosFilters[filter](todos);
  }
  return todos;
}

export function getNextState(state) {
  if (nextState.hasOwnProperty(state)) {
    return nextState[state]();
  }
  return state;
}
