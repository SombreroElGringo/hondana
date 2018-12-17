import React, { Component } from 'react';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import { fetchBookcase, resetBookcase } from '../../redux/actions/app';
import getAccess from '../../redux/selectors/auth/getAccess';
import getBookcase from '../../redux/selectors/app/getBookcase';
import {
  ADD_BOOK_FORM_FIELDS,
  CATEGORIES,
  BOOKS_URL,
} from '../../utils/constants';

class BookcaseBookForm extends Component {
  state = {
    isCreated: null,
    error: null,
  };

  handleSubmit(e) {
    e.preventDefault();
    const { bookcaseId , access} = this.props;
    const token = !access ? '' : access.auth ? access.auth.token : '';

    const formData = new FormData(this.refs.form);
    const bookcases = !formData.get('addInBookcase') ? [] : [bookcaseId];
    const data = {
      isbn10: formData.get('isbn10'),
      isbn13: formData.get('isbn13'),
      title: formData.get('title'),
      description: formData.get('description'),
      coverImageUrl: formData.get('coverImageUrl'),
      categories: formData.getAll('category'),
      releaseAt: formData.get('releaseAt'),
      bookcases: bookcases,
    };

    axios
      .post(BOOKS_URL, data)
      .then(({ data }) => {

        this.setState({ isCreated: true, error: null })

        this.props.resetBookcase();
        this.props.fetchBookcase(bookcaseId, token);
      })
      .catch(error => {
        const msg = !error.response
          ? 'Bad Request'
          : error.response.message
            ? error.response.message
            : 'Internal Error';
        this.setState({ isCreated: false, error: msg });
      });
  }

  // TODO nice form book
  render() {
    // TODO: Nice form under the black header
    const { isCreated, error } = this.state;
    return (
      <div>
        {isCreated ? (
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
  }),
  mapDispatchToProps({
    fetchBookcase,
    resetBookcase,
  })
)(BookcaseBookForm);
