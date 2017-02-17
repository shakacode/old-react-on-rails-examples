/* eslint-disable import/prefer-default-export */
import * as actionTypes from './actionTypes.js'

export const addTodo = (text) => {
  return {
    type: actionTypes.addTodo,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: actionTypes.setVisibilityFilter,
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: actionTypes.toggleTodo,
    id
  }
}
