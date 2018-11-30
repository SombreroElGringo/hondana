import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import Header from '../../src/components/Header/Header';

describe('<GatorMenu />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Header />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
