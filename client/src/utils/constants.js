export const API_URL = 'http://localhost:5000'
export const AUTH_URL = `${API_URL}/auth`;
export const AUTHORS_URL = `${API_URL}/authors`;
export const BOOKS_URL = `${API_URL}/books`;
export const BOOKCASES_URL = `${API_URL}/bookcases`;

export const CATEGORIES = [
  'Polar',
  'Animation',
  'Action',
  'Aventure',
  'Fantasy',
  'Cuisine',
  'Botannique',
  'Manga',
  'Contes & Légendes',
];
  
export const ADD_BOOK_FORM_FIELDS = [
  {
    name: 'isbn10',
    placeholder: 'ISBN 10',
  },
  {
    name: 'isbn13',
    placeholder: 'ISBN 13',
  },
  {
    name: 'title',
    placeholder: 'Titre du livre',
  },
  {
    name: 'description',
    placeholder: 'Description',
  },
  {
    name: 'coverImageUrl',
    placeholder: 'Image de couverture',
  },
  {
    name: 'categories',
  },
  {
    name: 'releaseAt',
    placeholder: 'Date de sortie',
  },
  {
    name: 'addInBookcase',
  },
];

export const ADD_AUTHOR_FORM_FIELDS = [
  {
    name: 'name',
    placeholder: 'Prénom Nom',
  },
  {
    name: 'authorCode',
    placeholder: 'Code auteur',
  },
  {
    name: 'biography',
    placeholder: 'Biographie',
  },
  {
    name: 'profileImageUrl',
    placeholder: 'Avatar',
  }
];
