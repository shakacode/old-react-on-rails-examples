// @flow
import apiCall from '../libs/utils/api/apiCall';

import type { descriptionAndId, toggle } from 'todosIndex/types';

// TODO: Add an environment variable management setup that allows env vars
// to be used with both React and React Native

const apiConfig = { remoteEndpoint: 'http://localhost:3000' };

export const todosScope = (path: ?string) => {
  return `${apiConfig.remoteEndpoint}/api/v1/todos${path || ''}`;
}

export const addRemoteEndpoint = async (remoteEndpoint: string) => {
  apiConfig.remoteEndpoint = remoteEndpoint;  //TODO: Check if the slash exists and remove it
}

export const delay = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

// /api/v1/todos
export const addTodo = async (description: string, completed: boolean = false) => {
  try {
    const url = todosScope();
    const todoParams = { todo: { description, completed } };
    const result = await apiCall.post({ url, data: todoParams });
    return ({ result });
  } catch (error) {
    return ({ error });
  }
};

// /api/v1/todos
export const editTodo = async (todo: descriptionAndId) => {
  try {
    const url = todosScope(`/${todo.id}`);
    const todoParams = { todo: { description: todo.description } };
    const result = await apiCall.put({ url, data: todoParams });
    return ({ result });
  } catch (error) {
    return ({ error });
  }
};

// /api/v1/todos/:todo_id
export const removeTodo = async (todoId: number) => {
  try {
    const url = todosScope(`/${todoId}`);
    const result = await apiCall.delete({ url });
    retrun ({ result });
  } catch (error) {
    return ({ error });
  }
};

// /api/v1/todos
export const toggleTodo = async (todo: toggle) => {
  try {
    const url = todosScope(`/${todo.id}`);
    const todoParams = { todo: { completed: todo.completed } };
    const result = await apiCall.put({ url, data: todoParams });
    return ({ result });
  } catch (error) {
    return ({ error });
  }
};

// /api/v1/todos
export const getTodos = async () => {
  try {
    const url = todosScope('/');
    const result = await apiCall.get({ url });
    return ({ result });
  } catch (error) {
    return ({ error });
  }
}
