// @flow
import { Map as $$Map } from 'immutable';

export type $$Todo = $$Map<string, | string | boolean>;

export type Todo = {
  completed: boolean,
  description: string,
};

export type MappedTodo = {
    [id: number]: Todo,
};

export type stringPayload = {
  payload: string,
}

export type numberPayload = {
  payload: number,
}

export type todoPayload = {
  payload: Todo,
}
