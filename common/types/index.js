// @flow
import { Map as $$Map } from 'immutable';

export type $$Todo = $$Map<string, string | boolean>;

export type descriptionAndId = {
  id: number,
  description: string,
};

export type toggle = {
  id: number,
  completed: boolean,
};

export type Todo = {
  id: number,
  completed: boolean,
  description: string,
  created_at: string,
  updated_at: string,
};

export type MappedTodo = {
  [id: number]: Todo,
};

export type normalizedTodoPayload = {
  payload: $$Map<number, Todo>,
};

export type getTodosPayload = {
  payload: $$Map<Todo>,
}

export type stringPayload = {
  payload: string,
};

export type numberPayload = {
  payload: number,
};

export type errorPayload = {
  payload: any,
  error: boolean,
};

export type descriptionPayload = {
  payload: descriptionAndId,
};

export type togglePayload = {
  payload: toggle,
};
