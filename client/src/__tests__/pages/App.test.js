import React from 'react';
import { shallow } from 'enzyme';
import App from '../../pages/App/App';

it('renders without crashing', () => {
  shallow(<App />);
});
