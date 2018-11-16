import React, { Component } from 'react';
import "./HomePage.css"

class HomePage extends Component {
  state = {
    stations: undefined,
  };

  submitHandler() {
	  this.setState({
	    stations: [
        { name: 'Bordeaux saint-jean' },
        { name: 'Paris (Toutes gares)' },
        { name: 'Arcachon' },
      ],
    });
  }

  componentDidMount(){
  	this.submitHandler();
  }

  render() {
    const { stations } = this.state;

    return (
      <div className={"container"} id={"homepage"}>
        <div className={'search-station'}>
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
                placeholder={'Renseignez votre gare'}
              />
              <button className={'btn btn-info'} type={'submit'}>
                Rechercher
              </button>
            </div>
          </form>
        </div>
        <div className="stations-result mt-4">
          <div className="row">
            {stations &&
              stations.map(station => {
                return <div className={"col-md-4"}>
	                <b>{station.name}</b>
                </div>;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
