// @flow eslint-disable import/no-extraneous-dependencies
import { POST, DELETE } from 'app/libs/constants/httpVerbs';

import { addTodo, removeTodo } from 'todosIndex/actions/todos/actionTypes';

export default {
  [addTodo]: { endpoint: '/todos', method: POST },
  [removeTodo]: { endpoint: '/todos', method: DELETE },
};
