// @flow
import apiCall from '../libs/utils/api/apiCall';

import type { descriptionAndId, toggle } from 'todosIndex/types';

// TODO: Add an environment variable management setup that allows env vars
// to be used with both React and React Native
 
const apiConfig = { remoteEndpoint: 'http://localhost:3000' };

export const todosScope = (path: ?string) => {
  return `${apiConfig.remoteEndpoint}/api/v1/todos${path || ''}`;
}

export const addRemoteEndpoint = (remoteEndpoint: string) => {
  apiConfig.remoteEndpoint = remoteEndpoint;  //TODO: Check if the slash exists and remove it
}

// /api/v1/todos
export const addTodo = (description: string, completed: boolean = false) => {
  const url = todosScope();
  const todoParams = { todo: { description, completed } };
  return apiCall.post({ url, data: todoParams });
};

// /api/v1/todos
export const editTodo = (todo: descriptionAndId) => {
  const url = todosScope(`/${todo.id}`);
  const todoParams = { todo: { description: todo.description } };
  return apiCall.put({ url, data: todoParams });
};

// /api/v1/todos/:todo_id
export const removeTodo = (todoId: number) => {
  const url = todosScope(`/${todoId}`);
  return apiCall.delete({ url });
};

// /api/v1/todos
export const toggleTodo = (todo: toggle) => {
  const url = todosScope(`/${todo.id}`);
  const todoParams = { todo: { completed: todo.completed } };
  return apiCall.put({ url, data: todoParams });
};

// /api/v1/todos
export const getTodos = () => {
  const url = todosScope('/');
  return apiCall.get({ url });
}
