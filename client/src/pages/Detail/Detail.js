import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import UserProfile from '../../components/UserProfile/UserProfile';
import LibraryBook from '../../components/LibraryBook/LibraryBook';
import { API_URL } from '../../utils/api_endpoints';
import { mapStateToProps } from '../../utils/redux_helpers';
import getToken from '../../redux/selectors/auth/getToken';

class Detail extends Component {
  state = {
    libraryId: 0,
  };
  componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const { id } = this.props.match.params;
    axios
      .get(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

export default connect(
  mapStateToProps({
    token: getToken,
  })
)(Detail);
