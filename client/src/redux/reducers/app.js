import { Map } from 'immutable';
import {
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESS,
  RESET_BOOKS,
  SET_APP_NAME,
  RESET_BOOKCASE,
  FETCH_BOOKCASE_FAIL,
  FETCH_BOOKCASE_SUCCESS,
} from '../consts/app';

const initState = Map({
  appName: 'SNCF-LIVE',
  books: null,
  bookcase: null,
});

const handlers = {
  [SET_APP_NAME]: (state, action) => state.set('appName', action.payload),

  [RESET_BOOKS]: state => state.set('books', null),
  [FETCH_BOOKS_SUCCESS]: (state, action) => state.set('books', action.payload),
  [FETCH_BOOKS_FAIL]: state => state.set('books', null),

  [RESET_BOOKCASE]: state => state.set('bookcase', null),
  [FETCH_BOOKCASE_SUCCESS]: (state, action) => state.set('bookcase', action.payload),
  [FETCH_BOOKCASE_FAIL]: state => state.set('bookcase', null),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
