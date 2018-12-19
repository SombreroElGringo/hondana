import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { mapStateToProps } from '../../utils/redux_helpers';
import getAccess from '../../redux/selectors/auth/getAccess';
import { connect } from 'react-redux';
import { deleteCookie} from '../../utils/cookie_helpers';

class Header extends React.Component {
  render() {
    const { access } = this.props;
    return (
      <header>
        <nav>
          <div className="left">
            <div className="brand">
              <Link to="/">Hondana</Link>
            </div>
          </div>
          {access ? (
            <div className="right">
              <div
                className="clickable"
                onClick={() =>
                  (window.location.href = `/bookcases/${
                    access.user.bookcaseId
                  }`)
                }
              >
                {access.user.pseudo}
              </div>
              <div className="clickable" onClick={this.handleLogout}>
                Logout
              </div>
            </div>
          ) : (
            <div className="right">
              <div>
                <Link to="/connexion">Connexion</Link>
              </div>
              <div>
                <Link to="/inscription">Inscription</Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    );
  }

  handleLogout = () => {
    deleteCookie('access');
    window.location.href = '/';
  };
}

export default connect(
  mapStateToProps({
    access: getAccess,
  })
)(Header);
