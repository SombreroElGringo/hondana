import { FETCH_BOOKS, FETCH_BOOKS_SUCCESS, SET_APP_NAME } from '../consts/app';

export const setAppName = newName => ({
  type: SET_APP_NAME,
  payload: newName,
});

export const fetchBooks = (title, categories) => dispatch => {
  dispatch({ type: FETCH_BOOKS });
  setTimeout(() => {
    dispatch({
      type: FETCH_BOOKS_SUCCESS,
      payload: [
        {
          id: 1,
          name: 'Bordeaux saint-jean',
          image:
            'https://img.20mn.fr/AnGcEiqxQ6umsAf3qVEe1w/830x532_10-janvier-2017-hall-1-gare-saint-jean-bordeaux-entierement-reamenage.jpg',
        },
        {
          id: 2,
          name: 'Paris (Toutes gares)',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Paris-Gare_de_l%27Est-2009.jpg/1200px-Paris-Gare_de_l%27Est-2009.jpg',
        },
        {
          id: 3,
          name: 'Arcachon',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Arcachon_Gare_R01.jpg/1200px-Arcachon_Gare_R01.jpg',
        },
      ],
    });
  }, 500);
};
