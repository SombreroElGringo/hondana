import React, { Component } from 'react';
import './Book.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import {
  removeBookFromBookcase,
  fetchBookcase,
  resetBookcase,
} from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBookcase from '../../redux/selectors/app/getBookcase';
import getBookIsRemoved from '../../redux/selectors/app/getBookIsRemoved';
import getError from '../../redux/selectors/app/getError';

class Book extends Component {
  state = {
    detail: this.props.detail || false,
  };

  handleClick(bookId) {
    this.props.showDetail(bookId);
  }

  async handleRemoveBookFromBookcase(bookId) {
    const { access, bookcase } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    await this.props.removeBookFromBookcase(bookcase._id, bookId).then(() => {
      this.props.resetBookcase();
      this.props.fetchBookcase(bookcase._id, token);
    });
  }

  render() {
    const { book, isCurrentUser } = this.props;
    const { detail } = this.state;
    // TODO: CSS nice detail plz
    // U can add more detail if u want
    if (detail) {
      return (
        <div className="book" onClick={e => this.handleClick(book._id)}>
          <img src={book.coverImageUrl} className="book--cover" alt="cover" />
          <h2 className="book--title">{book.title}</h2>
          <p>Auteur(s): {book.authors.map(author => author.name)}</p>
          <p className="book--description">{book.description}</p>
          {isCurrentUser ? (
            <button onClick={e => this.handleRemoveBookFromBookcase(book._id)}>
              Retirer le livre
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <div className="book" onClick={e => this.handleClick(book._id)}>
        <img src={book.coverImageUrl} className="book--cover" alt="cover" />
        <h2 className="book--title">{book.title}</h2>
      </div>
    );
  }
}

export default connect(
  mapStateToProps({
    access: getAccess,
    bookcase: getBookcase,
    bookIsRemoved: getBookIsRemoved,
    error: getError,
  }),
  mapDispatchToProps({
    removeBookFromBookcase,
    fetchBookcase,
    resetBookcase,
  })
)(Book);
