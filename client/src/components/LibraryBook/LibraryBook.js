import React, {Component} from 'react';
import Book from '../Book/Book';
import { API_URL } from '../../utils/api_endpoints';

class LibraryBook extends Component{
    render(){
        const {libraryId} = this.props;
        const {bookcases} = libraryId;
        return (
        <section className={'user--library'}>
            <div className="container">
                <div className="row">
                    {bookcases.map((bookcase) => 
                        bookcase.books.map((book) => 
                                book && <Book bookId={book}/>
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