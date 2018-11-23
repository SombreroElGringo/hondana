import React, { Component } from 'react';
import './HomePage.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBooks } from '../../redux/actions/app';
import getBooks from '../../redux/selectors/app/getBooks';
import SearchBook from '../../components/SearchBook/SearchBook';

class HomePage extends Component {
  render() {
    const { books, fetchBooks, history } = this.props;
    return (
      <div className="container" id="homepage">
        <img
          className="homepage_image mb-4"
          src="http://mojehobbi.pl/wp-content/uploads/2015/12/leaves-1076307_1280.jpg"
          alt=""
        />
        <SearchBook fetchBooks={fetchBooks} books={books} history={history} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: getBooks(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBooks,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
