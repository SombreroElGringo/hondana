import React from 'react';
import axios from 'axios';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import {
  fetchBooks,
  resetBooks,
  fetchBookcase,
  resetBookcase,
} from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBooks from '../../redux/selectors/app/getBooks';
import getBookcase from '../../redux/selectors/app/getBookcase';
import { BOOKCASES_URL } from '../../utils/constants';
import '../SearchBook/SearchBook.css';

class BookcaseSearchBook extends React.Component {
  state = {
    isAdded: null,
    error: null,
  };

  handleSubmit = event => {
    event.preventDefault();

    const { access, books, bookcase, resetBooks } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    const formData = new FormData(this.refs.form);
    const title = formData.get('title');
    resetBooks();

    const wantedBook = books.filter(book => book.title === title);

    axios
      .post(`${BOOKCASES_URL}/${bookcase._id}/book/${wantedBook[0]._id}`)
      .then(({ data }) => {
        this.setState({ isAdded: true, error: null });

        this.props.resetBookcase();
        this.props.fetchBookcase(bookcase._id, token);
      })
      .catch(error => {
        const msg = !error.response
          ? 'Bad Request'
          : error.response.message
            ? error.response.message
            : 'Internal Error';
        this.setState({ isAdded: false, error: msg });
      });
  };

  // TODO Improve CSS

  handleAutocomplete = event => {
    const { fetchBooks } = this.props;
    const value = event.target.value;
    this.timer = null;

    if (this.timer) clearTimeout(this.timer);
    this.time = setTimeout(() => {
      fetchBooks(value, null, true);
    }, 500);
  };

  render() {
    const { books } = this.props;
    const { isAdded, error } = this.state;
    return (
      <div className="search-book">
        {isAdded ? <span>Le livre a bien été crée</span> : <span>{error}</span>}
        <form autoComplete="off" ref="form" onSubmit={this.handleSubmit}>
          <div className="d-flex">
            <Search
              name="title"
              results={
                books &&
                books.map(b => ({
                  title: b.title,
                }))
              }
              selectFirstResult={true}
              className={'flex-1 autocomplete'}
              onSearchChange={this.handleAutocomplete}
            />
            <button
              className="btn btn-info ml-2"
              type="submit"
              disabled={books === undefined}
            >
              {books === undefined ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                'Ajouter le livre'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps({
    access: getAccess,
    books: getBooks,
    bookcase: getBookcase,
  }),
  mapDispatchToProps({
    fetchBooks,
    resetBooks,
    fetchBookcase,
    resetBookcase,
  })
)(BookcaseSearchBook);
