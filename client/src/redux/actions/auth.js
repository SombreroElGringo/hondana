import * as axios from 'axios';
import {
  HANDLE_AUTH,
  HANDLE_AUTH_SUCCESS,
  HANDLE_AUTH_FAIL,
} from '../consts/app';
import { AUTH_URL } from '../../utils/constants';

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
