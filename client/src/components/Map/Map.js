import React, { Component } from 'react';
const L = window.L;

class Map extends Component {
  componentDidMount() {
    this.setupMap();
  }

  render() {
    console.log(this.props.coords);
    return <div id="map" />;
  }

  setupMap() {
    let position = { latitude: 44.8538445, longitude: -0.5716133 };

    this.map = L.map('map').setView(
      [position.latitude, position.longitude],
      14
    );
    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        id: 'mapbox.streets',
        accessToken:
          'pk.eyJ1IjoiZGVtb3JpdGUiLCJhIjoiY2pwY3NqZGp4MTJ1ejNwcDJ4cDR5cmpiNSJ9.yBQrs4v5d09Gg12Lce74tA',
      }
    ).addTo(this.map);
  }
}

export default Map;
