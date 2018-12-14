import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';
import { Provider } from 'react-redux';
import store from '../../redux';

it('renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <Header />
    </Provider>
  );
});
