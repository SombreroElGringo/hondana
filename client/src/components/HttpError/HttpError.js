import React from 'react';
import './HttpError.css';

export default class HttpError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: this.props.error,
    };
  }

  render() {
    const httpCatUrl =
      'https://http.cat/' +
      (this.state.error.httpCode || this.state.error.status || 500);
    const message = this.state.error.message;
    console.log(message);
    const content = message ? (
      <div className={'http-error-card'}>
        <img alt={'un chat'} className={'http-error-image'} src={httpCatUrl} />
        <p className={'http-error-content'}>{message}</p>
      </div>
    ) : (
      <div className={'http-error-card'}>
        <img alt={'un chat'} className={'http-error-image'} src={httpCatUrl} />
      </div>
    );
    return content;
  }
}
