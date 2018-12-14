import React, { Component } from 'react';
import axios from 'axios';
import { BOOKCASES_URL } from '../../utils/api_endpoints';
const L = window.L;

class Map extends Component {
  componentDidMount() {
    this.setupMap();
  }

  render() {
    return <div id="map" />;
  }

  setupMap() {
    const { books, parent, history } = this.props;
    let position = { latitude: 44.8538445, longitude: -0.5716133 };

    this.map = parent.map = L.map('map').setView(
      [position.latitude, position.longitude],
      10
    );
    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        id: 'mapbox.streets',
        accessToken:
          'pk.eyJ1IjoiZGVtb3JpdGUiLCJhIjoiY2pwY3NqZGp4MTJ1ejNwcDJ4cDR5cmpiNSJ9.yBQrs4v5d09Gg12Lce74tA',
      }
    ).addTo(this.map);

    const bookcases = {};
    books &&
      books.forEach(book => {
        book.bookcases &&
          book.bookcases.map(async bookcase => {
            if (bookcases[bookcase._id])
              return bookcases[bookcase._id].books.push(book);
            const coordinate = bookcase.coordinate;
            const marker = L.marker(
              [coordinate.latitude, coordinate.longitude],
              {
                icon: L.icon({
                  iconUrl: 'https://img.icons8.com/metro/1600/book.png',
                  iconSize: [40, 40],
                }),
                title: (await axios.get(
                  BOOKCASES_URL + '/' + bookcase._id
                )).data.books
                  .map(b => b.title)
                  .join(', '),
              }
            )
              .addTo(this.map)
              .on('click', () => {
                history.push('/bookcases/' + bookcase.owner);
              });
            return (bookcases[bookcase._id] = {
              coordinate,
              marker,
              books: [book],
            });
          });
      });
  }
}

export default Map;
