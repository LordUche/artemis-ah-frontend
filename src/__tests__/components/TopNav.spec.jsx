import React from 'react';
import { shallow } from 'enzyme';
import { TopNav, mapStateToProps } from '../../components/TopNav';

describe('map state to props for topNav', () => {
  it('should do what I like', () => {
    expect(
      mapStateToProps({
        auth: { isLoggedIn: true },
        user: { image: 'image_URL', username: 'shaolinmkz' },
        notifications: { hasNewNotifications: true, notificationNumber: 1, notificationsData: [{}] }
      })
    ).toEqual({
      isLoggedIn: true,
      image: 'image_URL',
      username: 'shaolinmkz',
      hasNewNotifications: true,
      notificationNumber: 1,
      notificationsData: [{}]
    });
  });
});

describe('test the side nav', () => {
  const topNav = shallow(
    <TopNav
      isLoggedIn={false}
      notificationsData={[{}]}
      fetchNotifications={jest.fn()}
      newNotification={jest.fn()}
      hasNewNotifications={false}
      notificationNumber={2}
    />
  );
  const topNavII = shallow(
    <TopNav
      isLoggedIn
      notificationsData={[{}]}
      fetchNotifications={jest.fn()}
      newNotification={jest.fn()}
      hasNewNotifications={false}
      notificationNumber={2}
    />
  );
  it('should return a div for unauthenticated users', () => {
    expect(topNav.find('div').exists()).toBe(true);
  });

  it('should return a div for authenticated', () => {
    expect(topNavII.find('div').exists()).toBe(true);
  });

  it('should return a div', () => {
    expect(topNav.find('div').exists()).toBe(true);
  });

  topNavII.setState({ display: 'desktop' });
  topNavII.update();
});

describe('test the hamburger menu', () => {
  const topNav = shallow(
    <TopNav
      notificationsData={[{}]}
      fetchNotifications={jest.fn()}
      newNotification={jest.fn()}
      hasNewNotifications={false}
      notificationNumber={2}
    />
  );

  it('should contain the hamburger component', () => {
    expect(topNav.find('Hamburger').exists()).toBe(true);
  });

  it('should hide the menu by default', () => {
    expect(topNav.state('showResponsiveNav')).toEqual(false);
  });

  it('should toggle the menu when the toggle function is fired', () => {
    topNav.instance().toggleResponsiveNav();
    expect(topNav.state('showResponsiveNav')).toEqual(true);
    topNav.instance().toggleResponsiveNav();
    expect(topNav.state('showResponsiveNav')).toEqual(false);
  });
});

describe('Navbar Links', () => {
  const topNav = shallow(
    <TopNav
      notificationsData={[{}]}
      fetchNotifications={jest.fn()}
      newNotification={jest.fn()}
      hasNewNotifications={false}
      notificationNumber={2}
    />
  );
  it('shows the login modal when login button is clicked', () => {
    topNav.find('span#top-nav-login').simulate('click');
    expect(topNav.state('showLoginModal')).toEqual(true);
    expect(topNav.state('showSignUpModal')).toEqual(false);
  });
  it('shows the sign up modal when signup button is clicked', () => {
    topNav.find('span#top-nav-signup').simulate('click');
    expect(topNav.state('showSignUpModal')).toEqual(true);
    expect(topNav.state('showLoginModal')).toEqual(false);
  });
});
