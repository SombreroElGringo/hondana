import React, {Component} from 'react';
import { API_URL } from '../../utils/api_endpoints';
import axios from 'axios';

import './Book.css';

class Book extends Component{
    state={
        bookId:0,
        bookTitle: '',
        bookAuthor:'',
        bookCover:'',
        bookDescription:''
    }

    componentDidMount(){
        const{bookId} = this.props;
        console.log(bookId)
        axios.get(`${API_URL}/books/${bookId}`)
        .then(response => (
            this.setState({
                bookId: response.data._id,
                bookTitle:response.data.title,
                bookCover:response.data.coverImageUrl,
                bookAuthor:response.data.authors.name,
                bookDescription:response.data.description
            })
        ) 
    )
}

    render(){
        const {
            bookId,
            bookTitle,
            bookAuthor,
            bookCover,
            bookDescription} = this.state;
        return(
            <div>
                <h2>{bookTitle}</h2>
                <img src={bookCover}/>
                <p>{bookDescription}</p>
            </div>
            
        )
    }
}
export default Book;