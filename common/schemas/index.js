// @flow
import { schema } from 'normalizr';

import { normalize } from 'app/libs/utils/normalizr';
import type { Todo } from '../types';

const todoSchema = new schema.Entity('todos');
const todoListSchema = [todoSchema];

export const normalizeTodo = (todo: Todo) => normalize(todo, todoSchema);
export const normalizeTodos = (todosArray: Array<Todo>) => normalize(todosArray, todoListSchema);
