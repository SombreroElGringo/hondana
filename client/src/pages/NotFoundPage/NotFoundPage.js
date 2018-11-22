import React, { Component } from 'react';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="container text-center">
        <img className="img-fluid" src={'https://http.cat/404'} alt={''} />
      </div>
    );
  }
}

export default NotFoundPage;
