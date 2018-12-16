import React, { Component } from 'react';
import Rating from '../Rating/Rating';

export default class BookcaseHeader extends Component {
  render() {
    const { user } = this.props;
    return (
      <section className="user--profile">
        <img
          src={user && user.profileImageUrl}
          className="img-thumbnail profile--picture"
          alt="profile_picture"
        />
        <div className="user--info">
          <h2 className="user--pseudo">{user && user.pseudo}</h2>
          <p className="user--mail">{user && user.email}</p>
          {user && user.comments && <Rating rates={user.comments} />}
        </div>
      </section>
    );
  }
}
