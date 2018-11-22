import React from 'react';
import Station from '../Station/Station';
import './StationsList.css';

class StationsList extends React.Component {
  render() {
    const { stations } = this.props;
    if (!stations) return null;

    return (
      <div className="stations-result mt-4">
        <p className="text-center">
          <b>
            Gare
            {stations.length > 1 && 's'} à proximité
          </b>
        </p>
        {stations.length <= 0 ? (
          <div>
            <i>{"Il n'y a pas de gares à proximité"}</i>
          </div>
        ) : (
          <div className="row">
            {stations.map((station, index) => (
              <Station key={station.id} station={station} index={index}/>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default StationsList;
