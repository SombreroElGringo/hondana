import React, { Component } from 'react';
import './Rating.css';

export default class Rating extends Component {
  render() {
    const { rates } = this.props;
    let avg =
      rates.reduce((a, b) => a + b.rating, 0) / rates.length;

    let ratingRender = [];
    for (let i = 0; i < 5; i++) {
      if (Number.isInteger(avg) && avg > 0) {
        ratingRender.push(<span className="fa fa-star checked" key={i} />);
        avg--;
      } else if (!Number.isInteger(avg) && avg - 0.5 > 0) {
        ratingRender.push(
          <span className="fa fa-star-half-o checked" key={i} />
        );
        avg += -0.5;
      } else {
        ratingRender.push(
          <span className="fa fa-star" key={Math.random() * 100} />
        );
      }
    }
    return <div className="user--rating">{ratingRender.reverse()}</div>;
  }
}
