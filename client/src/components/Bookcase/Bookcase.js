import React, { Component } from 'react';
import BookcaseHeader from './BookcaseHeader';
import BookcaseList from './BookcaseList';
import './Bookcase.css';

export default class Bookcase extends Component {
  render() {
    const { data, currentPseudo } = this.props;
    const { books, owner, coordinate } = data;
    const ownerPseudo = owner ? owner.pseudo : null;
    const isCurrentUser =
      ownerPseudo && ownerPseudo === currentPseudo ? true : false;
    const isLogged = currentPseudo ? true : false;
    return (
      <div>
        <BookcaseHeader
          user={owner}
          isCurrentUser={isCurrentUser}
          isLogged={isLogged}
          coordinate={coordinate}
        />
        <BookcaseList books={books} isCurrentUser={isCurrentUser} />
      </div>
    );
  }
}
