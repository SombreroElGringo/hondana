import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import BookcaseSearchBook from './BookcaseSearchBook';
import BookcaseMap from './BookcaseMap';

export default class BookcaseHeader extends Component {
  state = {
    showAddBook: false,
  };

  handleAddBook(e) {
    const { showAddBook } = this.state;
    this.setState({
      showAddBook: !showAddBook,
    });
  }

  render() {
    const { user, isCurrentUser, isLogged, coordinate } = this.props;
    const { showAddBook } = this.state;
    // TODO: Nice button on the right or middle
    // nice <a> for the email when we are logged
    return (
      <section className="user--profile">
        <img
          src={user && user.profileImageUrl}
          className="img-thumbnail profile--picture"
          alt="profile_picture"
        />
        <div className="user--info">
          <h2 className="user--pseudo">{user && user.pseudo}</h2>
          {isLogged ? (
            <p className="user--mail">{user && user.email}</p>
          ) : (
            <Link to="/connexion">Afficher email</Link>
          )}
          {user && user.comments && <Rating rates={user.comments} />}
        </div>
        {isCurrentUser ? (
          <div>
            <button onClick={e => this.handleAddBook(e)}>
              Ajouter un livre
            </button>
            <BookcaseMap coordinate={coordinate} />
          </div>
        ) : null}
        {showAddBook ? <BookcaseSearchBook /> : null}
      </section>
    );
  }
}
