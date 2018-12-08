import React, {Component} from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/api_endpoints';
import UserRating from '../UserRating/UserRating';


class UserProfile extends Component{
    state={
        user : undefined,
        userRating: 0
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
            <img src={user && user.profileImageUrl} alt='profile_picture'/>
            <p>{user && user.pseudo}</p>
            <p>{user && user.email}</p>
            {user && <UserRating userRating= {user.comments[0].rating}/>}
        </section>
        )
    }
}

export default UserProfile;