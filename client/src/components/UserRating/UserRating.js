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
        return(
            <div>
                <p>MAchin</p>
            </div>
        )
    }
}
export default UserRating;