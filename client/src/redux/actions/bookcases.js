import {
  RESET_BOOKCASE,
  FETCH_BOOKCASE,
  FETCH_BOOKCASE_SUCCESS,
  FETCH_BOOKCASE_FAIL,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAIL,
  REMOVE_BOOK_FROM_BOOKCASE_SUCCESS,
  REMOVE_BOOK_FROM_BOOKCASE_FAIL,
  REMOVE_BOOK_FROM_BOOKCASE,
  ADD_BOOK_IN_BOOKCASE,
  ADD_BOOK_IN_BOOKCASE_SUCCESS,
  ADD_BOOK_IN_BOOKCASE_FAILED,
} from '../consts/app';
import { BOOKS_URL, BOOKCASES_URL } from '../../utils/constants';
import axios from 'axios';

export const resetBookcase = () => ({
  type: RESET_BOOKCASE,
});

export const fetchBookcase = (bookcaseId, token) => async dispatch => {
  dispatch({ type: FETCH_BOOKCASE });
  try {
    const response = await axios.get(`${BOOKCASES_URL}/${bookcaseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const addBook = data => async dispatch => {
  dispatch({ type: ADD_BOOK });
  try {
    await axios.post(BOOKS_URL, data);

    dispatch({
      type: ADD_BOOK_SUCCESS,
      bookIsCreated: true,
    });
  } catch (error) {
    const msg = !error.response
      ? 'Bad Request'
      : (error.response.message = 'Internal Error'
          ? 'Le livre existe déjà!'
          : 'Internal Error');

    dispatch({
      type: ADD_BOOK_FAIL,
      bookIsCreated: false,
      error: msg,
    });
  }
};

export const addBookInBookcase = (bookcaseId, bookId) => async dispatch => {
  dispatch({ type: ADD_BOOK_IN_BOOKCASE });
  try {
    await axios.post(`${BOOKCASES_URL}/${bookcaseId}/book/${bookId}`);

    dispatch({
      type: ADD_BOOK_IN_BOOKCASE_SUCCESS,
      bookIsAdded: true,
    });
  } catch (error) {
    dispatch({
      type: ADD_BOOK_IN_BOOKCASE_FAILED,
      error: error,
    });
  }
};

export const removeBookFromBookcase = (
  bookcaseId,
  bookId
) => async dispatch => {
  dispatch({ type: REMOVE_BOOK_FROM_BOOKCASE });
  try {
    await axios.delete(`${BOOKCASES_URL}/${bookcaseId}/book/${bookId}`);

    dispatch({
      type: REMOVE_BOOK_FROM_BOOKCASE_SUCCESS,
      bookIsRemoved: true,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_BOOK_FROM_BOOKCASE_FAIL,
      bookIsRemoved: false,
      error: error,
    });
  }
};
