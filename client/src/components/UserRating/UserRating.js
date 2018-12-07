import React, { Component } from 'react';

import './UserRating.css'
class UserRating extends Component{
    state = {
        leftComma: 0,
        rightComma: 0
    }

    componentDidMount(){
        const {userRating} = this.props;
        const {leftComma, rightComma} = this.state;

        const ratingRender = [];

        if(userRating){
            const sUserRating = userRating.toString();
            const ratingArray = sUserRating.split('.')
            this.setState(
                {
                    leftComma: parseInt(ratingArray[0]),
                    rightComma: parseInt(ratingArray[1])
                }
            )
        }
    console.log(leftComma, rightComma)
}

    render(){
        const {leftComma, rightComma} = this.state;
        let ratingRender = [];

        for (let i = 0; i < leftComma; i++) {
            ratingRender.push(<span className="fa fa-star checked" key={i}></span>)
        }
        if(rightComma > 2 && rightComma <= 7)
            ratingRender.push(<span className="fa fa-star-half checked"></span>)
        else if(rightComma > 7)
            ratingRender.push(<span className="fa fa-star checked"></span>)
        else if(rightComma <= 2)
            ratingRender.push(<span className="fa fa-star"></span>)
        if(ratingRender.length<5)
            for (let i = ratingRender.length; i < 5; i++) {
                ratingRender.push(<span className="fa fa-star"></span>)
            }
        return(
            <div className='user--rating'>
                {ratingRender}
            </div>
        )
    }
}
export default UserRating;