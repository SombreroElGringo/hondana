import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../utils/api_endpoints';
import { mapStateToProps } from '../../utils/redux_helpers';
import getAccess from '../../redux/selectors/auth/getAccess';
import Bookcase from '../../components/Bookcase/Bookcase';

class BookcasePage extends Component {
  state = {
    bookcaseId: this.props.match.params.bookcaseId,
    bookcase: null,
  };

  componentDidMount() {
    const { access } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';
    const { bookcaseId } = this.state;

    axios
      .get(`${API_URL}/bookcases/${bookcaseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => this.setState({ bookcase: data }));
  }

  render() {
    const { bookcase } = this.state;
    return (
      <div className="related--book">
        {bookcase && <Bookcase data={bookcase} />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps({
    access: getAccess,
  })
)(BookcasePage);
