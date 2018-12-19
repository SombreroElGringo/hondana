import React, { Component } from 'react';
import Book from '../Book/Book';

export default class BookcaseList extends Component {
  state = {
    showDetailOfBookId: null,
  };

  handleDetail(bookId) {
    const { showDetailOfBookId } = this.state;
    this.setState({
      showDetailOfBookId:
        bookId && showDetailOfBookId !== bookId ? bookId : null,
    });
  }

  render() {
    const { books, isCurrentUser } = this.props;
    const { showDetailOfBookId } = this.state;
    return (
      <section className="user--library">
        <div className="container">
          <div className="row">
            {books &&
              books.map(book => (
                <Book
                  book={book}
                  showDetail={this.handleDetail.bind(this)}
                  detail={book._id === showDetailOfBookId ? true : false}
                  isCurrentUser={isCurrentUser}
                  key={Math.random() * 100}
                />
              ))}
          </div>
        </div>
      </section>
    );
  }
}
