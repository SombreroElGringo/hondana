import React, { Component } from 'react';
import axios from 'axios';

import UserProfile from '../../components/UserProfile/UserProfile';
import LibraryBook from '../../components/LibraryBook/LibraryBook';
import { API_URL } from '../../utils/api_endpoints';

export default class Detail extends Component {
  state = {
    libraryId: 0,
  };
  componentDidMount() {
    // USER MOCKING
    // const userId = '5c0ab0de12e593135f96c575'

    const { id } = this.props.match.params;
    axios
      .get(`${API_URL}/users/${id}`)
      .then(response => this.setState({ libraryId: response.data }));
  }

  render() {
    const { libraryId } = this.state;
    return (
      <div className={'related--book'}>
        <UserProfile userId={this.props.match.params.id} />
        {libraryId && <LibraryBook libraryId={libraryId} />}
      </div>
    );
  }
}
