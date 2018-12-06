import { Map } from 'immutable';
import {
  FETCH_BOOKS,
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESS,
  SET_APP_NAME,
} from '../consts/app';

const initState = Map({
  appName: 'SNCF-LIVE',
  books: null,
});

const handlers = {
  [SET_APP_NAME]: (state, action) => state.set('appName', action.payload),

  [FETCH_BOOKS_SUCCESS]: (state, action) => state.set('books', action.payload),
  [FETCH_BOOKS_FAIL]: state => state.set('books', null),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
