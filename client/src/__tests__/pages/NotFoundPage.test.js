import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../redux';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <NotFoundPage />
      </Provider>
    );
  });
});
