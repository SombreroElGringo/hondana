import {
  RESET_AUTHORS,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAIL,
  FETCH_AUTHORS,
} from '../consts/app';
import { AUTHORS_URL } from '../../utils/constants';
import axios from 'axios';

export const resetAuthors = () => ({
  type: RESET_AUTHORS,
});

export const fetchAuthors = (name, full) => async dispatch => {
  dispatch({ type: FETCH_AUTHORS });
  try {
    const response = await axios.get(AUTHORS_URL, {
      params: {
        name,
      },
    });

    if (!(response.data.length >= 0)) throw new Error('There is no results');

    const payload = response.data;

    dispatch({
      type: FETCH_AUTHORS_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: FETCH_AUTHORS_FAIL,
      error,
    });
  }
};
