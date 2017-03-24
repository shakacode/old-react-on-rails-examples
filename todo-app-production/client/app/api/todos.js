// @flow
import apiCall from 'app/libs/utils/api/apiCall';

import type { descriptionAndId } from 'todosIndex/types';

// /api/v1/guest_lists
export const todosScope = (path: ?string) => `/todos${path || ''}`;

// /api/v1/todos
export const addTodo = (data: string) => {
  const url = todosScope();
  return apiCall.post({ url, data });
};

// /api/v1/todos
export const editTodo = (todo: descriptionAndId) => {
  const url = todosScope(`/${todo.id}`);
  return apiCall.put({ url, description: todo.description });
};

// /api/v1/todos/:todo_id
export const removeTodo = (todoId: number) => {
  const url = todosScope(`/${todoId}`);
  return apiCall.delete({ url });
};
