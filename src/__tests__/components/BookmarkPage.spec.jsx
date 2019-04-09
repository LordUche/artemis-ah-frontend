import React from 'react';
import { shallow } from 'enzyme';
import BookmarkPage from '../../views/BookmarkPage';

describe('Bookmark Page Component', () => {
  const bookmarkPage = shallow(<BookmarkPage />);

  it('should have a div present', () => {
    expect(bookmarkPage.find('div').exists()).toBe(true);
  });
});
