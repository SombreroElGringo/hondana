import React, { Component } from 'react';
import Book from '../Book/Book';

class LibraryBook extends Component {
  render() {
    const { libraryId } = this.props;
    const { bookcases } = libraryId;
    return (
      <section className={'user--library'}>
        <div className="container">
          <div className="row">
            {bookcases.map(bookcase =>
              bookcase.books.map(
                book => book && <Book bookId={book} key={Math.random() * 100} />
              )
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default LibraryBook;
