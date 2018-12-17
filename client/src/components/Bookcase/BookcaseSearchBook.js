import React from 'react';
import axios from 'axios';
import { fetchBooks, resetBooks } from '../../redux/actions/app';
import { connect } from 'react-redux';
import getBooks from '../../redux/selectors/app/getBooks';
import { Search } from 'semantic-ui-react';
import '../SearchBook/SearchBook.css';
import { mapDispatchToProps, mapStateToProps } from '../../utils/redux_helpers';
import { BOOKCASES_URL } from '../../utils/constants';

class BookcaseSearchBook extends React.Component {
  state = {
    isAdded: null,
    error: null,
  };

  handleSubmit = event => {
    event.preventDefault();

    const { bookcaseId, resetBooks, books } = this.props;
    const formData = new FormData(this.refs.form);
    const title = formData.get('title');
    resetBooks();

    const wantedBook = books.filter(book => book.title === title);

    axios
      .post(`${BOOKCASES_URL}/${bookcaseId}/book/${wantedBook[0]._id}`)
      .then(({ data }) => this.setState({ isAdded: true, error: null }))
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
    books: getBooks,
  }),
  mapDispatchToProps({
    fetchBooks,
    resetBooks,
  })
)(BookcaseSearchBook);
