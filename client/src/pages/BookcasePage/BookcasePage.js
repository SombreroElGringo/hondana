import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BOOKCASES_URL } from '../../utils/constants';
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
      .get(`${BOOKCASES_URL}/${bookcaseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => this.setState({ bookcase: data }));
  }

  render() {
    const { bookcase } = this.state;
    const { access } = this.props;
    const currentUser = !access ? null : access.user ? access.user : null;
    const currentPseudo = currentUser ? currentUser.pseudo : null;
    return (
      <div className="related--book">
        {bookcase && <Bookcase data={bookcase} currentPseudo={currentPseudo} />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps({
    access: getAccess,
  })
)(BookcasePage);
