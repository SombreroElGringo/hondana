import React, { Component } from 'react';
import { API_URL } from '../../utils/api_endpoints';
import axios from 'axios';

import './Book.css';

class Book extends Component {
  state = {};

  componentDidMount() {
    const { bookId } = this.props;
    axios.get(`${API_URL}/books/${bookId}`).then(response => {
      this.setState({
        bookId: response.data._id,
        bookTitle: response.data.title,
        bookCover: response.data.coverImageUrl,
        bookAuthor: (response.data.authors || {}).name,
        bookDescription: response.data.description,
      });
    });
  }

  render() {
    const { bookTitle, bookCover, bookDescription } = this.state;
    return (
      <div className="book">
        <h2 className="book--title">{bookTitle}</h2>
        <img src={bookCover} className="book--cover" alt="cover" />
        <p className="book--description">{bookDescription}</p>
      </div>
    );
  }
}
export default Book;
