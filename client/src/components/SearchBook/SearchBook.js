import React from 'react';
import { fetchBooks } from '../../redux/actions/app';
import { connect } from 'react-redux';
import getBooks from '../../redux/selectors/app/getBooks';
import { Search } from 'semantic-ui-react';
import './SearchBook.css';
import { mapDispatchToProps, mapStateToProps } from '../../utils/redux_helpers';

class SearchBook extends React.Component {
  render() {
    const { books } = this.props;

    const categories = [
      'Polar',
      'Animation',
      'Action',
      'Aventure',
      'Fantasy',
      'Cuisine',
      'Botannique',
      'Manga',
      'Contes & Légendes',
    ];

    return (
      <div className="search-book">
        <form autoComplete="off" ref="form" onSubmit={this.handleSubmit}>
          <div className="d-flex">
            <Search
              name="title"
              results={books}
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
                'Rechercher'
              )}
            </button>
          </div>
          <div className="mt-3">
            <div>
              <b>Recherche par categorie :</b>
            </div>
            {categories.map(category => (
              <label key={category} className="mr-3">
                <input
                  type="checkbox"
                  name="category"
                  multiple="multiple"
                  value={category}
                  className="mr-2"
                />
                {category[0].toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </form>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const formData = new FormData(this.refs.form);
    const title = formData.get('title');
    const categories = formData.getAll('category');

    if (title || (categories && categories.length > 0))
      history.push(`/books/search/`, { title, categories });
  };

  handleAutocomplete = event => {
    const { fetchBooks } = this.props;
    const value = event.target.value;
    this.timer = null;

    if (this.timer) clearTimeout(this.timer);
    this.time = setTimeout(() => {
      fetchBooks(value);
    }, 500);
  };
}

export default connect(
  mapStateToProps({
    books: getBooks,
  }),
  mapDispatchToProps({
    fetchBooks,
  })
)(SearchBook);
