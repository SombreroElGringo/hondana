import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../redux';
import AuthPage from '../../pages/AuthPage/AuthPage';

describe('AuthPage', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <AuthPage />
      </Provider>
    );
  });
});
