import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import { BookmarkPage } from '../../views/BookmarkPage';
import getMockArticles from '../../__mocks__/articles';

describe('Bookmark Page Component', () => {
  const mockFunction = jest.fn();
  const mockBookmarkLoading = jest.fn();
  const mockGetBookmarks = jest.fn();
  const mockDeleteBookmark = jest.fn();
  const mockProps = {
    isLoggedIn: true,
    bookmarkedArticles: getMockArticles(31),
    bookmarkDeleted: {},
    loading: false,
    errors: {},
    clearErrors: mockFunction,
    token: 'abcd',
    history: {
      action: 'string',
      block: mockFunction,
      createHref: mockFunction,
      go: mockFunction,
      goBack: mockFunction,
      goForward: mockFunction,
      length: 1,
      listen: mockFunction,
      location: {},
      push: mockFunction,
      replace: mockFunction
    },
    bookmarkLoading: mockBookmarkLoading,
    getBookmarks: mockGetBookmarks,
    deleteBookmark: mockDeleteBookmark
  };
  const bookmarkPage = shallow(
    <BookmarkPage
      {...mockProps}
    />
  );

  it('should render the bookmark section', () => {
    expect(bookmarkPage.find('section.bookmark_section').exists()).toBe(true);
  });
  it('should render the pagination component if articles are more than 15', () => {
    expect(bookmarkPage.find('Pagination').exists()).toBe(true);
  });
  it('should render page 1 by default', () => {
    expect(bookmarkPage.find('Pagination').prop('currentPage')).toEqual(1);
    expect(bookmarkPage.state('currentPage')).toEqual(1);
  });
  it('should not render the pagination component if articles are less than 15', () => {
    const singlePageBookmarkPage = shallow(
      <BookmarkPage
        {...{ ...mockProps, bookmarkedArticles: getMockArticles(14) }}
      />
    );
    expect(singlePageBookmarkPage.find('Pagination').exists()).toBe(false);
  });
  it('should render informative text if user has no bookmarked articles', () => {
    const noBookmarkPage = shallow(
      <BookmarkPage
        {...{ ...mockProps, bookmarkedArticles: [] }}
      />
    );
    expect(noBookmarkPage.find('p.bookmark_section_empty_text').exists()).toBe(true);
    expect(noBookmarkPage.find('p.bookmark_section_empty_text').text()).toEqual('You have not bookmarked any articles');
  });
  it('should not render text or article item when loading', () => {
    const loadingBookmarkPage = shallow(
      <BookmarkPage
        {...{ ...mockProps, bookmarkedArticles: [], loading: true }}
      />
    );
    expect(loadingBookmarkPage.find('p.bookmark_section_empty_text').exists()).toBe(false);
    expect(loadingBookmarkPage.find('ArticleItem').exists()).toBe(false);
  });
  it('should show and hide delete modal when respective methods are called', () => {
    expect(bookmarkPage.state('showDeleteModal')).toBe(false);
    bookmarkPage.instance().revealDeleteModal(getMockArticles(1)[0]);
    expect(bookmarkPage.state('showDeleteModal')).toBe(true);
    bookmarkPage.instance().hideDeleteModal();
    expect(bookmarkPage.state('showDeleteModal')).toBe(false);
  });
  it('should show login modal when the user is not signed in', () => {
    const noAuthBookmarkPage = shallow(
      <BookmarkPage
        {...{ ...mockProps, isLoggedIn: false }}
      />
    );
    expect(noAuthBookmarkPage.state('showLoginModal')).toBe(true);
  });
  it('should show and hide signup modal when respective methods are called', () => {
    expect(bookmarkPage.state('showSignUpModal')).toBe(false);
    bookmarkPage.instance().toggleSignUpModal();
    expect(bookmarkPage.state('showSignUpModal')).toBe(true);
    bookmarkPage.instance().toggleSignUpModal();
    expect(bookmarkPage.state('showSignUpModal')).toBe(false);
  });
  it('should delete bookmark when the unbookmark article function is called', () => {
    bookmarkPage.instance().unbookmarkArticle();
    expect(mockDeleteBookmark.mock.calls.length).toEqual(1);
  });
  it('should update the current page when handle pagination function is called', () => {
    /**
     * @description function for returning a mock event object
     * @param {string} id event target id
     * @returns {object} event
     */
    const mockPageClickEvent = id => ({
      preventDefault: () => 'prevented default',
      target: {
        id
      },
      currentTarget: {
        dataset: {
          page: 2
        }
      }
    });
    bookmarkPage.instance().handlePagination(mockPageClickEvent('first-page'));
    expect(bookmarkPage.state('currentPage')).toEqual(1);

    bookmarkPage.instance().handlePagination(mockPageClickEvent('last-page'));
    expect(bookmarkPage.state('currentPage')).toEqual(3);

    bookmarkPage.instance().handlePagination(mockPageClickEvent('next-page'));
    expect(bookmarkPage.state('currentPage')).toEqual(2);

    bookmarkPage.instance().handlePagination(mockPageClickEvent('previous-page'));
    expect(bookmarkPage.state('currentPage')).toEqual(2);

    bookmarkPage.instance().handlePagination(mockPageClickEvent('default'));
    expect(bookmarkPage.state('currentPage')).toEqual(1);
  });
});
