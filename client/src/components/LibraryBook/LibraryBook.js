import React, {Component} from 'react';
import Book from '../Book/Book';
import { API_URL } from '../../utils/api_endpoints';

class LibraryBook extends Component{
    render(){
        const {libraryId} = this.props;
        return (
        <section className={'user--library'}>
            <div className="container">
                <div className="row">
                    {libraryId.map((bookcase) => 
                        bookcase.books.map((book) => 
                                book._id && <Book bookId={book._id}/>
                            )
                        )
                    }
                </div>
            </div>
        </section>
        )
    }
}

export default LibraryBook;