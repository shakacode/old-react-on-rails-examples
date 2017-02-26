// @flow
import { Map as $$Map } from 'immutable';

export type $$Todo = $$Map<string, string | boolean>;

export type tempTodo = {
  id: string,
  description: string,
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

export type tempTodoPayload = {
  payload: tempTodo,
};

export type addTodoSuccessPayload = {
  payload: {
    todo: Todo,
    tempTodo: tempTodo,
  },
};

export type tempTodoAction = {
  type: string,
  payload: tempTodo,
};

export type numberAction = {
  type: string,
  payload: number,
};
