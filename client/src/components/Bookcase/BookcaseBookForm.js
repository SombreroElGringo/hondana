import React, { Component } from 'react';

export default class BookcaseBookForm extends Component {
  handleSubmit(e) {
    const data = {
      isbn10: this.isbn10.value,
    };
    console.log(data);
  }

  // TODO nice form book
  render() {
    const categories = [
      'Polar',
      'Animation',
      'Action',
      'Aventure',
      'Fantasy',
      'Cuisine',
      'Botannique',
      'Manga',
      'Contes & Légendes',
    ];

    const bookFormFields = [
      {
        name: 'isbn10',
        placeholder: 'ISBN 10',
      },
      {
        name: 'isbn13',
        placeholder: 'ISBN 13',
      },
      {
        name: 'title',
        placeholder: 'Titre du livre',
      },
      {
        name: 'description',
        placeholder: 'Description',
      },
      {
        name: 'coverImageUrl',
        placeholder: 'Image de couverture',
      },
      {
        name: 'categories',
      },
      {
        name: 'releaseAt',
        placeholder: 'Date de sortie',
      },
      {
        name: 'addInBookcase',
      },
    ];

    // TODO: Nice form under the black header
    return (
      <div>
        <form>
          {bookFormFields
            ? bookFormFields.map(
                field =>
                  field.name === 'categories' ? (
                    <label key={Math.random() * 100}>
                      {categories
                        ? categories.map(categorie => (
                            <label key={Math.random() * 100}>
                              {categorie}{' '}
                              <input
                                type="checkbox"
                                name="categories[]"
                                value={categorie}
                              />
                            </label>
                          ))
                        : null}
                    </label>
                  ) : field.name === 'addInBookcase' ? (
                    <label  key={Math.random() * 100}>
                      <input type="checkbox" name="addInBookcase" value="yes" />{' '}
                      Ajouter dans ma bookcase!
                    </label>
                  ) : (
                    <input
                      className="field"
                      ref={ref => {
                        this[field.name] = ref;
                      }}
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
            value="Ajouter le livre"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}
