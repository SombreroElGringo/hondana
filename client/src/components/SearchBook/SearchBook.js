import React from 'react';
import './SearchBook.css';

class SearchBook extends React.Component {
  submitHandler() {
    const { fetchBooks } = this.props;
    fetchBooks();
  }

  componentDidMount() {
    const { fetchBooks } = this.props;
    fetchBooks();
  }

  render() {
    const { books } = this.props;
    return (
      <div className="search-book">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.submitHandler();
          }}
        >
          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Renseignez votre gare"
            />
            <button className="btn btn-info" type="submit">
              {books === undefined ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                'Rechercher'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBook;
