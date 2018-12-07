import {
  FETCH_BOOKS,
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESS,
} from '../consts/app';
import { BOOKS_URL } from '../../utils/api_enpoints';
import axios from 'axios';

export const fetchBooks = (title, categories, full) => async dispatch => {
  dispatch({ type: FETCH_BOOKS });
  try {
    const response = await axios.get(BOOKS_URL, {
      params: {
        title,
        categories,
      },
    });

    if (!response.data) throw 'There is no results';

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
