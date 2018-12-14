import React from 'react';
import Link from 'react-router-dom/es/Link';
import './Header.css';
import { mapStateToProps } from '../../utils/redux_helpers';
import getToken from '../../redux/selectors/auth/getToken';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { token } = this.props;

    return (
      <header>
        <nav>
          <div className="left">
            <div className="brand">
              <Link to="/">Hondana</Link>
            </div>
          </div>
          {token ? (
            <div className="right">
              <div>Vous êtes connecté</div>
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
    token: getToken,
  })
)(Header);
