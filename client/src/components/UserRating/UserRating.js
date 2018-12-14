import React, { Component } from 'react';

import './UserRating.css';
class UserRating extends Component {
  state = {
    leftComma: 0,
    rightComma: 0,
  };

  componentDidMount() {
    const { userRating } = this.props;
    let median = 0.0;
    userRating.map(rating => (median += rating.rating));

    const userRatingFloat = Number.parseFloat(
      median / userRating.length
    ).toFixed(1);

    const sUserRating = userRatingFloat.toString();
    const ratingArray = sUserRating.split('.');
    if (ratingArray) {
      this.setState({
        leftComma: parseInt(ratingArray[0]),
        rightComma: parseInt(ratingArray[1]),
      });
    }
  }

  render() {
    const { leftComma, rightComma } = this.state;
    let ratingRender = [];
    for (let i = 0; i < leftComma; i++) {
      ratingRender.push(<span className="fa fa-star checked" key={i} />);
    }
    if (rightComma > 2 && rightComma <= 7)
      ratingRender.push(
        <span className="fa fa-star-half checked" key={Math.random() * 100} />
      );
    else if (rightComma > 7)
      ratingRender.push(
        <span className="fa fa-star checked" key={Math.random() * 100} />
      );
    else if (rightComma <= 2)
      ratingRender.push(
        <span className="fa fa-star" key={Math.random() * 100} />
      );
    if (ratingRender.length < 5)
      for (let i = ratingRender.length; i < 5; i++) {
        ratingRender.push(
          <span className="fa fa-star" key={Math.random() * 100} />
        );
      }
    return <div className="user--rating">{ratingRender}</div>;
  }
}
export default UserRating;
