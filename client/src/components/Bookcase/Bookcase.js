import React, { Component } from 'react';
import BookcaseHeader from './BookcaseHeader';
import BookcaseList from './BookcaseList';
import './Bookcase.css';

export default class Bookcase extends Component {
  render() {
    const { data } = this.props;
    const { books, owner } = data;
    return (
      <div>
        <BookcaseHeader user={owner} />
        <BookcaseList books={books} />
      </div>
    );
  }
}
