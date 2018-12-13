import { Map } from 'immutable';
import {
  HANDLE_AUTH_SUCCESS,
  HANDLE_AUTH_FAIL,
  HANDLE_AUTH,
} from '../consts/app';

const initState = Map({
  token: undefined,
  errors: [],
});

const handlers = {
  [HANDLE_AUTH]: (state, { errors }) => state.set('errors', errors),
  [HANDLE_AUTH_SUCCESS]: (state, { payload }) => state.set('token', payload),
  [HANDLE_AUTH_FAIL]: (state, { payload, errors }) =>
    state.set('token', null).set('errors', errors),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
