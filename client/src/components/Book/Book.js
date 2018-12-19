import React, { Component } from 'react';
import './Book.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import {
  removeBookFromBookcase,
  fetchBookcase,
  resetBookcase,
} from '../../redux/actions/bookcases';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBookcase from '../../redux/selectors/bookcases/getBookcase';
import getBookIsRemoved from '../../redux/selectors/bookcases/getBookIsRemoved';

class Book extends Component {
  state = {
    detail: this.props.detail || false,
    isDetailActive: false,
  };

  handleClick(bookId) {
    const { isDetailActive } = this.state;
    this.props.showDetail(bookId);
    this.setState({ isDetailActive: !isDetailActive });
  }

  async handleRemoveBookFromBookcase(bookId) {
    const { access, bookcase, resetBookcase, fetchBookcase } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    await this.props.removeBookFromBookcase(bookcase._id, bookId).then(() => {
      resetBookcase();
      fetchBookcase(bookcase._id, token);
    });
  }

  render() {
    const { book, isCurrentUser } = this.props;
    const { detail, isDetailActive } = this.state;
    const placeholderImg = '/static/media/404_cover_not_found.d98d8fb7.jpg';
    // TODO: CSS nice detail plz
    // U can add more detail if u want
    if (detail) {
      return (
        <div className="book" onClick={e => this.handleClick(book._id)}>
          <img
            src={
              book.coverImageUrl && book.coverImageUrl !== ''
                ? book.coverImageUrl
                : placeholderImg
            }
            className="book--cover"
            alt="cover"
          />
          {isDetailActive ? (
            <h2 className="book--title">{book.title}</h2>
          ) : (
            <h2 className="book--title__opened">{book.title}</h2>
          )}
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
        <img
          src={
            book.coverImageUrl && book.coverImageUrl !== ''
              ? book.coverImageUrl
              : placeholderImg
          }
          className="book--cover"
          alt="cover"
        />
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
  }),
  mapDispatchToProps({
    removeBookFromBookcase,
    fetchBookcase,
    resetBookcase,
  })
)(Book);
