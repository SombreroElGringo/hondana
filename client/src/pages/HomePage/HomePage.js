import React, { Component } from 'react';
import './HomePage.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBooks } from '../../redux/actions/app';
import getBooks from '../../redux/selectors/app/getBooks';
import SearchBook from '../../components/SearchBook/SearchBook';
import BooksList from '../../components/BooksList/BooksList';

class HomePage extends Component {
  render() {
    const { books, fetchBooks } = this.props;

    return (
      <div className="container" id={'homepage'}>
        <SearchBook fetchBooks={fetchBooks} books={books} />
        <BooksList books={books} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: getBooks(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBooks,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
