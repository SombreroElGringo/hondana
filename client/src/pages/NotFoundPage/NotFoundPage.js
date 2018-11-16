import React, { Component } from 'react';

class NotFoundPage extends Component {
  render() {
    return (
      <div className={'container text-center'}>
        <img className={'img-fluid'} src={'https://http.cat/404'} />
      </div>
    );
  }
}

export default NotFoundPage;
