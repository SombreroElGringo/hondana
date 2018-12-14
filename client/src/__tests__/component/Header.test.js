import { mount } from 'enzyme';

// Component to be tested
const Header = require('../../components/Header/Header');

describe('<GatorMenu />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = mount(Header);
      expect(wrapper.find('.left')).toBeTruthy();
    });
  });
});
