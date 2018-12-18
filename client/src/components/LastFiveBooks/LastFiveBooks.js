import * as React from 'react';
import './LastFiveBooks.css';
import openSocket from 'socket.io-client';

class LastFiveBooks extends React.Component {
  state = { books: undefined };

  componentDidMount() {
    const socket = openSocket('http://localhost:5000');
    socket.on('connect', () => {
      console.log('Connected');
      socket.emit('eventGetFiveLastBooks', {}, books =>
        this.setState({ books })
      );

      socket.on('eventSendFiveLastBooks', books => this.setState({ books }));
    });

    socket.on('disconnect', function() {
      console.log('Disconnected');
    });
  }

  render() {
    const { books } = this.state;
    console.log(books);
    return (
      <div id="LastFiveBooks">
        {books &&
          books.map(book => (
            <div className="book" key={book._id}>
              <div className="cover">
                <img src={book.coverImageUrl} alt="cover" />
              </div>
              <abbr className="title" title={book.title}>
                {book.title.length < 15
                  ? book.title
                  : book.title.substr(0, 15) + '...'}
              </abbr>
              <div className="meta">
                <div className="description">{book.description}</div>
                <div className="authors">
                  {book.authors.map(author => (
                    <div key={author._id} className="author">
                      - {author.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default LastFiveBooks;
