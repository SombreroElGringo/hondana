import React from 'react';
import './SearchStation.css';

class SearchStation extends React.Component {
  submitHandler() {
    const { fetchStations } = this.props;
    fetchStations();
  }

  componentDidMount() {
    const { fetchStations } = this.props;
    fetchStations();
  }

  render() {
    const { stations } = this.props;
    return (
      <div className="search-station">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.submitHandler();
          }}
        >
          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Renseignez votre gare"
            />
            <button className="btn btn-info" type="submit">
              {stations === undefined ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                'Rechercher'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchStation;
