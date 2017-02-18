// I'm assuming we'll be using Fetch & Normalizer here?
// Should we be using a services folder like the redux-saga examples?

const callApi = (method, endpoint, schema) => {
  throw error('not implemented yet');
}

export const addTodo = (Todo) => callApi('POST', '/todos', Todo);
export const removeTodo = (id) => callApi('DELETE', '/todos', id);
