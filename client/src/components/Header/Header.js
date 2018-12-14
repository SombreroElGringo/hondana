import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { mapStateToProps } from '../../utils/redux_helpers';
import getAccess from '../../redux/selectors/auth/getAccess';
import { connect } from 'react-redux';

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
              <div>{access.user.pseudo}</div>
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
}

export default connect(
  mapStateToProps({
    access: getAccess,
  })
)(Header);
