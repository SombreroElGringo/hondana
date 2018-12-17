import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

export default class BookcaseHeader extends Component {
  render() {
    const { user, isCurrentUser, isLogged } = this.props;
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
        {isCurrentUser ? <button>Add book in the bookcase</button> : null}
      </section>
    );
  }
}
