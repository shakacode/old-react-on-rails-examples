// @flow
import { Map as $$Map } from 'immutable';

export type $$Todo = $$Map<string, | string | boolean>;

export type tempTodo = {
  id: string,
  description: string,
}

export type Todo = {
  id: number,
  completed: boolean,
  description: string,
  created_at: string,
  updated_at: string,
}

export type MappedTodo = {
  [id: number]: Todo,
}

export type stringPayload = {
  payload: string,
}

export type numberPayload = {
  payload: number,
}

export type tempTodoPayload = {
  payload: tempTodo
}

export type addTodoPayload = {
  payload: {
    Todo,
    tempTodo,
  }
}
