import React, { Component } from 'react';
import './BookPage.css';
import Map from '../../components/Map/Map';
import getBooks from '../../redux/selectors/app/getBooks';
import { connect } from 'react-redux';
import { fetchBooks } from '../../redux/actions/app';
import { mapDispatchToProps, mapStateToProps } from '../../utils/redux_helpers';
import { BOOKCASES_URL } from '../../utils/api_enpoints';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import { Link } from 'react-router-dom';

class BookPage extends Component {
  state = {
    details: false,
  };

  toggleDetails = () => {
    const { details } = this.state;
    this.setState({
      details: !details,
      bookcases: [],
    });
  };

  fetchBookcases = async ids => {
    this.setState({
      bookcases: await Promise.all(
        ids.map(async id => (await axios.get(BOOKCASES_URL + '/' + id)).data)
      ),
    });
  };

  componentDidMount() {
    const { fetchBooks, location } = this.props;
    const { title, categories } = location.state;
    fetchBooks(title, categories, true);
  }

  render() {
    const { books, location } = this.props;
    const { title, categories } = location.state;
    const { details, bookcases } = this.state;

    return (
      <div id="bookpage">
        {details ? (
          <div className="left">
            <div className="back-button" onClick={this.toggleDetails}>
              <i className="fa fa-arrow-left" /> Retour
            </div>
            <div className="results">
              <ul>
                {bookcases.map(bookcase => (
                  <li key={bookcase._id}>
                    <div className="cover">
                      <img src={bookcase.owner.profileImageUrl} alt="avatar" />
                    </div>
                    <div className="details">
                      <div className="title">
                        <Link to={'/bookcases/' + bookcase.owner._id}>
                          Bibliothèque de {bookcase.owner.pseudo}
                        </Link>
                      </div>
                      <div className="description">
                        <a href={`mailto:${bookcase.owner.email}`}>
                          Email : {bookcase.owner.email}
                        </a>
                        <br />
                        Nombre de livres : {bookcase.books.length}
                        <br />
                        Crée {moment(bookcase.createdAt).fromNow()}
                        <button
                          onClick={() =>
                            this.map.flyTo(
                              [
                                bookcase.coordinate.latitude,
                                bookcase.coordinate.longitude,
                              ],
                              10
                            )
                          }
                        >
                          Monther sur la carte
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
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
                  books.map(book => {
                    console.log(book);
                    return (
                      <li
                        className="hoverable"
                        key={book._id}
                        onClick={() => {
                          this.toggleDetails();
                          this.fetchBookcases(
                            book.bookcases.map(b => b._id)
                          ).catch(console.error);
                        }}
                      >
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
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
        <div className="right">
          <div className="map">
            {books && <Map books={books} parent={this} />}
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
