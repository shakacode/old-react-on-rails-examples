// I'm assuming we'll be using Fetch & Normalizer here?
// Should we be using a services folder like the redux-saga examples?

// eslint-disable-next-line no-unused-vars
const callApi = (method, endpoint, schema) => {
  throw new Error('callApi not implemented yet');
};

export const addTodo = (Todo) => callApi('POST', '/todos', Todo);
export const removeTodo = (id) => callApi('DELETE', '/todos', id);
