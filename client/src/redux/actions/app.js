import {
  FETCH_BOOKS,
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESS,
  RESET_BOOKS,
  RESET_BOOKCASE,
  FETCH_BOOKCASE,
  FETCH_BOOKCASE_SUCCESS,
  FETCH_BOOKCASE_FAIL,
} from '../consts/app';
import { BOOKS_URL, BOOKCASES_URL } from '../../utils/constants';
import axios from 'axios';

export const resetBooks = () => ({
  type: RESET_BOOKS,
});

export const fetchBooks = (title, categories, full) => async dispatch => {
  dispatch({ type: FETCH_BOOKS });
  try {
    const response = await axios.get(BOOKS_URL, {
      params: {
        title,
        categories,
      },
    });

    if (!(response.data.length >= 0)) throw new Error('There is no results');

    const payload = full
      ? response.data
      : response.data.map(({ title }) => ({
          title,
        }));

    dispatch({
      type: FETCH_BOOKS_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOOKS_FAIL,
      error,
    });
  }
};

export const resetBookcase = () => ({
  type: RESET_BOOKCASE,
});

export const fetchBookcase = (bookcaseId, token) => async dispatch => {
  dispatch({ type: FETCH_BOOKCASE });
  try {
    const response = await axios.get(`${BOOKCASES_URL}/${bookcaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }});

    if (!response.data) throw new Error('There is no results');

    const payload = response.data;

    dispatch({
      type: FETCH_BOOKCASE_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOOKCASE_FAIL,
      error,
    });
  }
};
