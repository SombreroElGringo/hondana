import React, {Component} from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/api_endpoints';
import UserRating from '../UserRating/UserRating';


class UserProfile extends Component{
    state={
        user : undefined
    };

    componentDidMount(){
    const {userID} = this.props;
    axios.get(`${API_URL}/users/${userID}`)
    .then(response => this.setState({user: response.data }))
    }
    render(){
        const { userID } = this.props;
        const {user} = this.state;
        return(
        <section className={'user--profile'}>
            <img src={user && user.profileImageUrl} alt='profile_picture'/>
            <p>{user && user.pseudo}</p>
            <p>{user && user.email}</p>
            <UserRating userId={userID}/>
        </section>
        )
    }
}

export default UserProfile;