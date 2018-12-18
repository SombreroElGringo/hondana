import React, { Component } from 'react';
import './HomePage.css';
import SearchBook from '../../components/SearchBook/SearchBook';
import LastFiveBooks from '../../components/LastFiveBooks/LastFiveBooks';

class HomePage extends Component {
  componentDidMount() {
    const socket = window.io('http://localhost:5000');

    socket.on('connect', function() {
      console.log('connected');
      socket.on('eventGetFiveLastBooks', response =>
        console.log('Get five last:', response)
      );
      socket.on('eventSendFiveLastBooks', response =>
        console.log('Send five last:', response)
      );
    });

    socket.on('disconnect', function() {
      console.log('Disconnected');
    });
  }

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
        <LastFiveBooks />
      </div>
    );
  }
}

export default HomePage;
