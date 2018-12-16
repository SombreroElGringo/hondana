import React, { Component } from 'react';
import './Book.css';

export default class Book extends Component {
  state = {
    detail: false,
  };

  handleClick(detail) {
    this.setState({
      detail: detail ? false : true,
    });
  }

  render() {
    const { book } = this.props;
    const { detail } = this.state;

    if (detail) {
      return (
        <div className="book" onClick={e => this.handleClick(detail)}>
          <img src={book.coverImageUrl} className="book--cover" alt="cover" />
          <h2 className="book--title">{book.title}</h2>
          <p>Auteur(s): {book.authors.map(author => author.name)}</p>
          <p className="book--description">{book.description}</p>
        </div>
      );
    }

    return (
      <div className="book" onClick={e => this.handleClick(detail)}>
        <img src={book.coverImageUrl} className="book--cover" alt="cover" />
        <h2 className="book--title">{book.title}</h2>
      </div>
    );
  }
}
