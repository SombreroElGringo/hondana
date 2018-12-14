import React from 'react';
import Book from '../../components/Book/Book';
import { mount } from 'enzyme';

describe('BookComponent', () => {
  let props;
  let mountedBookComponent;
  const bookComponent = () => {
    if (!mountedBookComponent) {
      mountedBookComponent = mount(<Book {...props} />);
    }
    return mountedBookComponent;
  };

  beforeEach(() => {
    props = {
      bookId: '5c0acd9b712c951a9ef7c32a',
    };
    mountedBookComponent = undefined;
  });

  it('always render', () => {
    const book = bookComponent();
    expect(book).toBeTruthy();
  });
  it('Book receive props', () => {
    const book = bookComponent();
    expect(book.props().bookId).toBe(props.bookId);
  });
  it('Book should call setState', () => {
    const book = bookComponent();
    return Promise.resolve(book)
      .then(() => new Promise(res => setTimeout(res, 1000)))
      .then(() => {
        expect(book.state().bookId).toBe(props.bookId);
      });
  });
});
