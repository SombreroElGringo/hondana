import React, { Component } from 'react';
import './BookPage.css';
import Map from '../../components/Map/Map';
import getBooks from '../../redux/selectors/app/getBooks';
import { connect } from 'react-redux';
import { fetchBooks } from '../../redux/actions/app';
import { mapDispatchToProps, mapStateToProps } from '../../utils/redux_helpers';

class BookPage extends Component {
  componentDidMount() {
    const { fetchBooks, location } = this.props;
    const { title, categories } = location.state;
    fetchBooks(title, categories, true);
  }

  render() {
    const { books, location } = this.props;
    const { title, categories } = location.state;

    return (
      <div id="bookpage">
        <div className="left">
          <div className="search-options">
            <b>Recherche</b>
            <div className="title">{title}</div>
            <div className="categories">
              {categories &&
                categories.map(cat => <div className="category">{cat}</div>)}
            </div>
          </div>
          <div className="results">
            <b>Livres</b>
            <ul>
              {books &&
                books.map(book => (
                  <li key={book._id}>
                    <div className="cover">
                      <img src={book.coverImageUrl} alt="cover" />
                    </div>
                    <div className="details">
                      <div className="title">{book.title}</div>
                      <div className="description">
                        {book.description.length > 60
                          ? book.description.slice(0, 60) + '...'
                          : book.description}
                      </div>
                      <div className="metas">
                        <div className="favorites">
                          <i className="fa fa-star" />
                          {book.meta.favorites.length}
                        </div>
                        <div className="likes">
                          <i className="fa fa-heart" />
                          {book.meta.likes.length}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="map">
            <Map />
          </div>
        </div>
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
  })
)(BookPage);
