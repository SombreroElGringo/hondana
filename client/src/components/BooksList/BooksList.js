import React from 'react';
import Book from '../Book/Book';
import './BooksList.css';

class BooksList extends React.Component {
  render() {
    const { books } = this.props;
    if (!books) return null;

    return (
      <div className="books-result mt-4">
        <p className="text-center">
          <b>
            Gare
            {books.length > 1 && 's'} à proximité
          </b>
        </p>
        {books.length <= 0 ? (
          <div>
            <i>{"Il n'y a pas de gares à proximité"}</i>
          </div>
        ) : (
          <div className="row">
            {books.map((book, index) => (
              <Book key={book.id} book={book} index={index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default BooksList;
