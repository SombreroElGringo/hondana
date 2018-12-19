import { Map } from 'immutable';
import {
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  RESET_ADD_BOOK,
  REMOVE_BOOK_FROM_BOOKCASE_SUCCESS,
  REMOVE_BOOK_FROM_BOOKCASE_FAIL,
  RESET_REMOVE_BOOK_FROM_BOOKCASE,
  ADD_BOOK_IN_BOOKCASE_SUCCESS,
  ADD_BOOK_IN_BOOKCASE_FAILED,
  RESET_ADD_BOOK_IN_BOOKCASE,
  RESET_BOOKCASE,
  FETCH_BOOKCASE_SUCCESS,
  FETCH_BOOKCASE_FAIL,
} from '../consts/app';

const initState = Map({
  bookcase: null,
  bookIsCreated: null,
  bookIsAdded: null,
  bookIsRemoved: null,
  error: null,
});

const handlers = {
  [RESET_BOOKCASE]: state => state.set('bookcase', null),
  [FETCH_BOOKCASE_SUCCESS]: (state, action) =>
    state.set('bookcase', action.payload),
  [FETCH_BOOKCASE_FAIL]: state => state.set('bookcase', null),

  [RESET_ADD_BOOK]: state => state.set('bookIsCreated', null),
  [ADD_BOOK_SUCCESS]: (state, action) =>
    state.set('bookIsCreated', action.payload),
  [ADD_BOOK_FAIL]: (state, { error }) =>
    state.set('bookIsCreated', null).set('error', error),

  [RESET_ADD_BOOK_IN_BOOKCASE]: (state, { error }) =>
    state.set('bookIsAdded', null).set('error', error),
  [ADD_BOOK_IN_BOOKCASE_SUCCESS]: (state, action) =>
    state.set('bookIsAdded', action.payload),
  [ADD_BOOK_IN_BOOKCASE_FAILED]: (state, { error }) =>
    state.set('bookIsAdded', null).set('error', error),

  [RESET_REMOVE_BOOK_FROM_BOOKCASE]: (state, { error }) =>
    state.set('bookIsRemoved', null).set('error', error),
  [REMOVE_BOOK_FROM_BOOKCASE_SUCCESS]: (state, action) =>
    state.set('bookIsRemoved', action.payload),
  [REMOVE_BOOK_FROM_BOOKCASE_FAIL]: (state, { error }) =>
    state.set('bookIsRemoved', null).set('error', error),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
