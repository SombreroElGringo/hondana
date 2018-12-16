import React, { Component } from 'react';
import Book from '../Book/Book';

export default class BookcaseList extends Component {
  render() {
    const { books } = this.props;
    return (
      <section className="user--library">
        <div className="container">
          <div className="row">
            {books &&
              books.map(book => <Book book={book} key={Math.random() * 100} />)}
          </div>
        </div>
      </section>
    );
  }
}
