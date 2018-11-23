import React from 'react';
import Link from 'react-router-dom/es/Link';
import './Header.css';

class Header extends React.Component {
  render() {
    const {} = this.props;

    return (
      <header>
        <nav>
          <div className="left">
            <div className="brand">
              <Link to="/">Hondana</Link>
            </div>
          </div>
          <div className="right">
            <div>
              <Link to="/connexion">Connexion</Link>
            </div>
            <div>
              <Link to="/inscription">Inscription</Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
