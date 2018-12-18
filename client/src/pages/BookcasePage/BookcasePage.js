import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import { fetchBookcase, resetBookcase } from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBookcase from '../../redux/selectors/app/getBookcase';
import Bookcase from '../../components/Bookcase/Bookcase';

class BookcasePage extends Component {
  componentDidMount() {
    const { access } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';
    const { bookcaseId } = this.props.match.params;

    this.props.fetchBookcase(bookcaseId, token);
  }

  render() {
    const { access, bookcase } = this.props;
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
    bookcase: getBookcase,
  }),
  mapDispatchToProps({
    fetchBookcase,
    resetBookcase,
  })
)(BookcasePage);
