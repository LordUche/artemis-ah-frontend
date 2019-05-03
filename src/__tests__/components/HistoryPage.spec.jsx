import React from 'react';
import { shallow } from 'enzyme';
import { HistoryPage } from '../../views/HistoryPage';
// import getMockArticles from '../../__mocks__/articles';


describe('History Page Component', () => {
  const mockFunction = jest.fn();
  const mockHistoryLoading = jest.fn();
  const mockGetHistory = jest.fn();
  const mockProps = {
    isLoggedIn: true,
    userHistory: [],
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
    historyLoading: mockHistoryLoading,
    getHistory: mockGetHistory,
  };
  const historyPage = shallow(<HistoryPage
    {...mockProps}
  />);

  it('should have a ProfileOptionCard present', () => {
    expect(historyPage.find('ProfileOptionCard').exists()).toBe(true);
  });

  // it('should not render the pagination component if history is less than 15', () => {
  //   const singlePagehistoryPage = shallow(
  //     <HistoryPage
  //       {...{ ...mockProps, userHistory: getMockArticles(14) }}
  //     />
  //   );
  //   expect(singlePagehistoryPage.find('Pagination').exists()).toBe(false);
  // });
  it('should render informative text if user has no history', () => {
    const nohistoryPage = shallow(
      <HistoryPage
        {...{ ...mockProps, userHistory: [] }}
      />
    );
    expect(nohistoryPage.find('p.bookmark_section_empty_text').exists()).toBe(true);
    expect(nohistoryPage.find('p.bookmark_section_empty_text').text()).toEqual('You have not read any articles');
  });
  it('should not render text or article item when loading', () => {
    const loadinghistoryPage = shallow(
      <HistoryPage
        {...{ ...mockProps, bookmarkedArticles: [], loading: true }}
      />
    );
    expect(loadinghistoryPage.find('p.bookmark_section_empty_text').exists()).toBe(false);
    expect(loadinghistoryPage.find('ArticleItem').exists()).toBe(false);
  });
  it('should show login modal when the user is not signed in', () => {
    const noAuthhistoryPage = shallow(
      <HistoryPage
        {...{ ...mockProps, isLoggedIn: false }}
      />
    );
    expect(noAuthhistoryPage.state('showLoginModal')).toBe(true);
  });
  it('should show and hide signup modal when respective methods are called', () => {
    expect(historyPage.state('showSignUpModal')).toBe(false);
    historyPage.instance().toggleSignUpModal();
    expect(historyPage.state('showSignUpModal')).toBe(true);
    historyPage.instance().toggleSignUpModal();
    expect(historyPage.state('showSignUpModal')).toBe(false);
  });
});
