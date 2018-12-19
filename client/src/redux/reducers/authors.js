import { Map } from 'immutable';
import {
  RESET_AUTHORS,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAIL,
} from '../consts/app';

const initState = Map({
  authors: null,
  error: null,
});

const handlers = {
  [RESET_AUTHORS]: state => state.set('authors', null),
  [FETCH_AUTHORS_SUCCESS]: (state, action) =>
    state.set('authors', action.payload),
  [FETCH_AUTHORS_FAIL]: state => state.set('authors', null),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
