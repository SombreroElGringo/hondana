import React, {Component} from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/api_endpoints';
import UserRating from '../UserRating/UserRating';

import './UserProfile.css';


class UserProfile extends Component{
    state={
        user : undefined,
    };

    componentDidMount(){
    const {userId} = this.props;
    axios.get(`${API_URL}/users/${userId}`)
    .then(response => this.setState({user: response.data}))
}
    render(){
        const { userId } = this.props;
        const {user} = this.state;
        return(
        <section className={'user--profile'}>
            <img src={user && user.profileImageUrl} className="img-thumbnail profile--picture" alt='profile_picture'/>
            <div className="user--info">
                <h2 className="user--pseudo">{user && user.pseudo}</h2>
                <p className="user--mail">{user && user.email}</p>
                {user && <UserRating userRating={user.comments}/>}
            </div>
        </section>
        )
    }
}

export default UserProfile;