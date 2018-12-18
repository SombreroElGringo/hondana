import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import { addBook, fetchBookcase, resetBookcase } from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBookcase from '../../redux/selectors/app/getBookcase';
import getBookIsCreated from '../../redux/selectors/app/getBookIsCreated';
import getError from '../../redux/selectors/app/getError';

import { ADD_BOOK_FORM_FIELDS, CATEGORIES } from '../../utils/constants';

class BookcaseBookForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const {
      bookcase,
      access,
      addBook,
      resetBookcase,
      fetchBookcase,
    } = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    const formData = new FormData(this.refs.form);
    const bookcases = !formData.get('addInBookcase') ? [] : [bookcase._id];
    const data = {
      isbn10: formData.get('isbn10'),
      isbn13: formData.get('isbn13'),
      title: formData.get('title'),
      description: formData.get('description'),
      coverImageUrl: formData.get('coverImageUrl'),
      categories: formData.getAll('category'),
      releaseAt: new Date(formData.get('releaseAt')),
      bookcases: bookcases,
    };

    addBook(data).then(() => {
      setTimeout(() => {
        resetBookcase();
        fetchBookcase(bookcase._id, token);
      }, 500);
    });
  }

  // TODO nice form book
  render() {
    // TODO: Nice form under the black header
    const { bookIsCreated, error } = this.props;
    return (
      <div>
        {bookIsCreated ? (
          <span>Le livre a bien été crée</span>
        ) : (
          <span>{error}</span>
        )}
        <form ref="form">
          {ADD_BOOK_FORM_FIELDS
            ? ADD_BOOK_FORM_FIELDS.map(
                field =>
                  field.name === 'categories' ? (
                    <label key={Math.random() * 100}>
                      {CATEGORIES
                        ? CATEGORIES.map(category => (
                            <label key={category} className="mr-3">
                              <input
                                type="checkbox"
                                name="category"
                                multiple="multiple"
                                value={category}
                                className="mr-2"
                              />
                              {category[0].toUpperCase() + category.slice(1)}
                            </label>
                          ))
                        : null}
                    </label>
                  ) : field.name === 'addInBookcase' ? (
                    <label key={Math.random() * 100}>
                      <input type="checkbox" name="addInBookcase" value="yes" />{' '}
                      Ajouter dans ma bookcase!
                    </label>
                  ) : (
                    <input
                      className="field"
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      key={Math.random() * 100}
                    />
                  )
              )
            : null}

          <input
            className="btn-form"
            type="button"
            value="Créer le livre"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps({
    access: getAccess,
    bookcase: getBookcase,
    bookIsCreated: getBookIsCreated,
    error: getError,
  }),
  mapDispatchToProps({
    addBook,
    fetchBookcase,
    resetBookcase,
  })
)(BookcaseBookForm);
