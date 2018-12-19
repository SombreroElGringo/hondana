import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../utils/redux_helpers';
import { addAuthor } from '../../../redux/actions/app';
import getAccess from '../../../redux/selectors/auth/getAccess';

import { ADD_AUTHOR_FORM_FIELDS } from '../../../utils/constants';

class BookcaseAuthorForm extends Component {
  handleSubmit(e) {}

  render() {
    return (
      <div>
        <form ref="form">
          {ADD_AUTHOR_FORM_FIELDS
            ? ADD_AUTHOR_FORM_FIELDS.map(field => (
                <input
                  className="field"
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  key={Math.random() * 100}
                />
              ))
            : null}

          <input
            className="btn-form"
            type="button"
            value="Créer l'auteur"
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
  }),
  mapDispatchToProps({
    addAuthor,
  })
)(BookcaseAuthorForm);
