import * as axios from 'axios';
import {
  HANDLE_AUTH,
  HANDLE_AUTH_SUCCESS,
  HANDLE_AUTH_FAIL,
} from '../consts/app';

import { CHECK_TOKEN_SUCCESS } from '../consts/auth';

import { AUTH_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookie_helpers';

export const handle_auth = (data, type) => dispatch => {
  dispatch({
    type: HANDLE_AUTH,
    errors: [],
  });

  const url =
    type === 'register' ? AUTH_URL + '/register' : AUTH_URL + '/login';

  axios
    .post(url, data)
    .then(({ data }) => {
      dispatch({
        type: HANDLE_AUTH_SUCCESS,
        payload: data.data,
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: HANDLE_AUTH_FAIL,
          errors: error.response.data ? error.response.data.message : [],
        });
      } else {
        dispatch({
          type: HANDLE_AUTH_FAIL,
          errors: { status: error.response.status },
        });
      }
    });
};

export const checkToken = () => dispatch => {
  const cookie = getCookie('access');
  if (cookie === '') return;
  const access = JSON.parse(cookie);

  if (access)
    dispatch({
      type: CHECK_TOKEN_SUCCESS,
      payload: access,
    });
};
