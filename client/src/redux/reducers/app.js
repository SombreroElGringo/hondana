import { Map } from 'immutable';
import {
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESS,
  RESET_BOOKS,
  SET_APP_NAME,
  RESET_BOOKCASE,
  FETCH_BOOKCASE_FAIL,
  FETCH_BOOKCASE_SUCCESS,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  RESET_ADD_BOOK,
  REMOVE_BOOK_FROM_BOOKCASE_SUCCESS,
  REMOVE_BOOK_FROM_BOOKCASE_FAIL,
  RESET_REMOVE_BOOK_FROM_BOOKCASE,
  RESET_AUTHORS,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAIL,
} from '../consts/app';

const initState = Map({
  appName: 'Hondana',
  authors: null,
  books: null,
  bookcase: null,
  bookIsCreated: null,
  bookIsRemoved: null,
  error: null,
});

const handlers = {
  [SET_APP_NAME]: (state, action) => state.set('appName', action.payload),

  [RESET_BOOKS]: state => state.set('books', null),
  [FETCH_BOOKS_SUCCESS]: (state, action) => state.set('books', action.payload),
  [FETCH_BOOKS_FAIL]: state => state.set('books', null),

  [RESET_BOOKCASE]: state => state.set('bookcase', null),
  [FETCH_BOOKCASE_SUCCESS]: (state, action) =>
    state.set('bookcase', action.payload),
  [FETCH_BOOKCASE_FAIL]: state => state.set('bookcase', null),

  [RESET_ADD_BOOK]: state => state.set('bookIsCreated', null),
  [ADD_BOOK_SUCCESS]: (state, action) =>
    state.set('bookIsCreated', action.payload),
  [ADD_BOOK_FAIL]: (state, { error }) =>
    state.set('bookIsCreated', null).set('error', error),

  [RESET_REMOVE_BOOK_FROM_BOOKCASE]: (state, { error }) =>
    state.set('bookIsRemoved', null).set('error', error),
  [REMOVE_BOOK_FROM_BOOKCASE_SUCCESS]: (state, action) =>
    state.set('bookIsRemoved', action.payload),
  [REMOVE_BOOK_FROM_BOOKCASE_FAIL]: (state, { error }) =>
    state.set('bookIsRemoved', null).set('error', error),

  [RESET_AUTHORS]: state => state.set('authors', null),
  [FETCH_AUTHORS_SUCCESS]: (state, action) => {
    console.log(action)
    state.set('authors', action)},
  [FETCH_AUTHORS_FAIL]: state => state.set('authors', null),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
