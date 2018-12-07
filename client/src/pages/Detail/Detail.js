import React, {Component} from 'react';

import './Detail.css';
import UserProfile from '../../components/UserProfile/UserProfile';
import Book from '../../components/LibraryBook/LibraryBook';

export default class Detail extends Component{
  render(){
    const {id} = this.props.match.params;
    return(
      <div className={'related--book'}>
        <UserProfile/>
        <Book/>
      </div>
    )
  }
}