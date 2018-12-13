import React, { Component } from 'react';
import './HomePage.css';
import SearchBook from '../../components/SearchBook/SearchBook';

class HomePage extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="container" id="homepage">
        <img
          className="homepage_image mb-4"
          src="http://mojehobbi.pl/wp-content/uploads/2015/12/leaves-1076307_1280.jpg"
          alt=""
        />
        <SearchBook history={history} />
      </div>
    );
  }
}

export default HomePage;
