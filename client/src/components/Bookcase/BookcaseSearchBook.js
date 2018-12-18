import React from 'react';
import { Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import {
  addBookInBookcase,
  fetchBookcase,
  resetBookcase,
} from '../../redux/actions/bookcases';
import { fetchBooks, resetBooks } from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBooks from '../../redux/selectors/app/getBooks';
import getBookcase from '../../redux/selectors/bookcases/getBookcase';
import '../SearchBook/SearchBook.css';

class BookcaseSearchBook extends React.Component {
  state = {
    isAdded: null,
    error: null,
  };

  handleSubmit = async event => {
    event.preventDefault();

    const {
      access,
      books,
      bookcase,
      resetBooks,
      resetBookcase,
      fetchBookcase,
      addBookInBookcase,
    } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    const formData = new FormData(this.refs.form);
    const title = formData.get('title');
    resetBooks();

    const wantedBook = books.filter(book => book.title === title);

    await addBookInBookcase(bookcase._id, wantedBook[0]._id).then(() => {
      resetBookcase();
      fetchBookcase(bookcase._id, token);
    });
  };

  handleAutocomplete = event => {
    const { fetchBooks } = this.props;
    const value = event.target.value;
    this.timer = null;

    if (this.timer) clearTimeout(this.timer);
    this.time = setTimeout(() => {
      fetchBooks(value, null, true);
    }, 500);
  };

  // TODO Improve CSS
  
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
    addBookInBookcase,
    fetchBookcase,
    resetBookcase,
  })
)(BookcaseSearchBook);
