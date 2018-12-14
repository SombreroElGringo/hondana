import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../redux';
import Detail from '../../pages/Detail/Detail';

describe('Detail', () => {
  let props;
  let mountedDetail;
  const detailComponent = () => {
    if (!mountedDetail) {
      mountedDetail = mount(
        <Provider store={store}>
          <Detail {...props} />
        </Provider>
      );
    }
    return mountedDetail;
  };

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: '5c0ab0de12e593135f96c57b',
        },
      },
    };
    mountedDetail = undefined;
  });
  it('renders without crashing', () => {
    const detail = detailComponent();
  });
});
