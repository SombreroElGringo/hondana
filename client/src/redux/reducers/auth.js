import { Map } from 'immutable';
import {
  HANDLE_AUTH_SUCCESS,
  HANDLE_AUTH_FAIL,
  HANDLE_AUTH,
} from '../consts/app';
import { CHECK_TOKEN_SUCCESS } from '../consts/auth';
import { setCookie } from '../../utils/cookie_helpers';

const initState = Map({
  access: undefined,
  errors: [],
});

const handlers = {
  [CHECK_TOKEN_SUCCESS]: (state, { payload }) => state.set('access', payload),
  [HANDLE_AUTH]: (state, { errors }) => state.set('errors', errors),
  [HANDLE_AUTH_SUCCESS]: (state, { payload }) => {
    setCookie('access', JSON.stringify(payload), payload.expiresIn);
    return state.set('access', payload);
  },
  [HANDLE_AUTH_FAIL]: (state, { payload, errors }) =>
    state.set('access', null).set('errors', errors),
};

export default (state = initState, action) => {
  if (typeof handlers[action.type] === 'function')
    return handlers[action.type](state, action);
  return state;
};
