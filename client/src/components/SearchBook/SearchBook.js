import React from 'react';
import './SearchBook.css';
import { fetchBooks } from '../../redux/actions/app';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getBooks from '../../redux/selectors/app/getBooks';

class SearchBook extends React.Component {
  submitHandler() {
    const { history } = this.props;
    const formData = new FormData(this.form);
    const title = formData.get('title');
    const categories = formData.getAll('category');
    let query = '';
    if (title) query += title;
    if (categories && categories.length > 0) query += `subject:${categories}`;

    query = query.replace(/ /g, '+').toLocaleLowerCase();

    if (query && query !== '') history.push(`/books/search/${query}`);
  }

  componentDidMount() {
    this.submitHandler();
  }

  render() {
    const { books } = this.props;

    const categories = [
      'polar',
      'animation',
      'action',
      'aventure',
      'fantasy',
      'cuisine',
      'botannique',
      'manga',
      'contes & légendes',
    ];

    return (
      <div className="search-book">
        <form
          ref={form => (this.form = form)}
          onSubmit={e => {
            e.preventDefault();
            this.submitHandler();
          }}
        >
          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Quel livre cherchez-vous ?"
            />
            <button className="btn btn-info ml-2" type="submit">
              {books === undefined ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                'Rechercher'
              )}
            </button>
          </div>
          <br />
          <div className="mt-3">
            <div>
              <b>Recherche par categorie :</b>
            </div>
            {categories.map(
              category =>
                category && (
                  <label key={category} className="mr-3">
                    <input
                      type="checkbox"
                      name="category"
                      multiple="multiple"
                      value={category.toLowerCase()}
                    />{' '}
                    {category[0].toUpperCase() + category.slice(1)}
                  </label>
                )
            )}
          </div>
        </form>
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
)(SearchBook);
