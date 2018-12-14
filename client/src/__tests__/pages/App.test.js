import React from 'react';
import { mount } from 'enzyme';
import App from '../../pages/App/App';
import { Provider } from 'react-redux';
import store from '../../redux';

it('renders without crashing', () => {
  mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
