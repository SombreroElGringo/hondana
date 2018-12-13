import React from 'react';
import './HttpError.css';

export default class HttpError extends React.Component {
  render() {
    const httpCatUrl =
      'https://http.cat/' +
      (this.props.error.httpCode || this.props.error.status || 500);
    const message = this.props.error.message;
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
