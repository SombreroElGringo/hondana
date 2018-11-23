import Link from 'react-router-dom/es/Link';
import React from 'react';
import './Book.css';

class Book extends React.Component {
  render() {
    const { book, index } = this.props;

    return (
      <Link
        key={book.id}
        className="col-md-4 book animated fadeInUp"
        style={{
          animationDelay: index + '00ms',
        }}
        to={{ pathname: '/livres/' + book.id }}
      >
        <div className="book-image">
          <img src={book.image} alt={book.name} />
        </div>
        <div className="book-name">
          <b>{book.name}</b>
        </div>
      </Link>
    );
  }
}

export default Book;
