import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../redux';
import BookPage from '../../pages/BookPage/BookPage';

describe('BookPage', () => {
  let props;
  let mountedBookPage;
  const bookPageComponent = () => {
    if (!mountedBookPage) {
      mountedBookPage = mount(
        <Provider store={store}>
          <BookPage {...props} />
        </Provider>
      );
    }
    return mountedBookPage;
  };

  beforeEach(() => {
    props = {
      location: {
        state: {
          title: 'Harry',
        },
      },
      history: {},
    };
    mountedBookPage = undefined;
  });
  it('renders without crashing', () => {
    const bookPage = bookPageComponent();
  });
});
