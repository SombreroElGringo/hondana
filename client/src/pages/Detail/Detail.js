import React, {Component} from 'react';
import axios from 'axios';

import './Detail.css';
import UserProfile from '../../components/UserProfile/UserProfile';
import Book from '../../components/LibraryBook/LibraryBook';
import { API_URL } from '../../utils/api_endpoints';

export default class Detail extends Component{
  componentDidMount(){
    // axios.get(`${API_URL}/bookcases?owner=5bffa87467accc0c40881457`).then((result) =>)
  }
  render(){
    return(
      <div className={'related--book'}>
        <UserProfile userId={this.props.match.params.id}/>
        {/* <Book bookId={}/> */}
      </div>
    )
  }
}