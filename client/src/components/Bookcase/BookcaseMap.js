import React from 'react';

import axios from 'axios';
import { BOOKCASES_URL } from '../../utils/constants';

const L = window.L;

class BookcaseMap extends React.Component {
  state = {
    editCoordinates: false,
  };

  toggleAddCoordinates = async () => {
    await this.setState({
      editCoordinates: !this.state.editCoordinates,
    });
    if (this.state.editCoordinates === true) this.setupMap();
  };

  handleCancel = () => {
    this.setState({
      latitude: undefined,
      longitude: undefined,
    });
    this.toggleAddCoordinates();
  };

  handleAddCoordinates = async () => {
    try {
      const { latitude, longitude } = this.state;
      const bookcaseID = window.location.pathname.split('/').pop();
      const response = await axios.post(
        `${BOOKCASES_URL}/${bookcaseID}/coordinate`,
        {
          longitude,
          latitude,
        }
      );
      if (response.status === 200) window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  setupMap = () => {
    const { coordinate } = this.props;
    let position = coordinate;

    this.map = L.map('coordinates--map').setView(
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

    this.updateMarker(coordinate);

    this.map.on('click', e => {
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;

      this.setState({ latitude, longitude });

      this.updateMarker({ latitude, longitude });
    });
  };

  updateMarker = ({ latitude, longitude }) => {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([latitude, longitude], {
      icon: L.icon({
        iconUrl: 'https://img.icons8.com/metro/1600/book.png',
        iconSize: [40, 40],
      }),
    }).addTo(this.map);
  };

  render() {
    const { editCoordinates, latitude, longitude } = this.state;

    return (
      <div className="coordinates--form--wrapper">
        {editCoordinates === false && (
          <button onClick={this.toggleAddCoordinates}>
            Modifier coordonées
          </button>
        )}
        {editCoordinates === true && (
          <div className="coordinates--form">
            <div id="coordinates--map" />
            <button
              className="coordinates--button--cancel"
              onClick={this.handleCancel}
            >
              Annuler
            </button>
            {latitude &&
              longitude && (
                <button
                  className="coordinates--button--submit"
                  onClick={this.handleAddCoordinates}
                >
                  Modifier les coordonées de la bibliothèque
                </button>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default BookcaseMap;
