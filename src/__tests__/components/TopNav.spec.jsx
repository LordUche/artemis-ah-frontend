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
      image="image"
      notificationsData={[{}]}
      fetchNotifications={jest.fn()}
      newNotification={jest.fn()}
      hasNewNotifications={false}
      notificationNumber={2}
      token="mock-token"
    />
  );
  const topNavII = shallow(
    <TopNav
      isLoggedIn
      image="image"
      notificationsData={[{}]}
      fetchNotifications={jest.fn()}
      newNotification={jest.fn()}
      hasNewNotifications={false}
      notificationNumber={2}
      token="mock-token"
    />
  );

  it('should return a div for unauthenticated users', (done) => {
    expect(topNav.find('div').exists()).toBe(true);
    // open notification
    topNavII.find('.nav-component-container-online2 .notificationBellLink').simulate('click');
    // close notification
    topNavII.find('.nav-component-container-online2 .notificationBellLink').simulate('click');
    done();
  });

  it('should return a div for authenticated', (done) => {
    expect(topNavII.find('div').exists()).toBe(true);
    done();
  });

  it('should return a div', (done) => {
    expect(topNav.find('div').exists()).toBe(true);
    done();
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

  it('should contain the hamburger component', (done) => {
    expect(topNav.find('Hamburger').exists()).toBe(true);
    done();
  });

  it('should hide the menu by default', (done) => {
    expect(topNav.state('showResponsiveNav')).toEqual(false);
    done();
  });

  it('should toggle the menu when the toggle function is fired', (done) => {
    topNav.instance().toggleResponsiveNav();
    expect(topNav.state('showResponsiveNav')).toEqual(true);
    topNav.instance().toggleResponsiveNav();
    expect(topNav.state('showResponsiveNav')).toEqual(false);
    done();
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
  it('shows the login modal when login button is clicked', (done) => {
    topNav.find('span#top-nav-login').simulate('click');
    expect(topNav.state('showLoginModal')).toEqual(true);
    expect(topNav.state('showSignUpModal')).toEqual(false);
    done();
  });
  it('shows the sign up modal when signup button is clicked', (done) => {
    topNav.find('span#top-nav-signup').simulate('click');
    expect(topNav.state('showSignUpModal')).toEqual(true);
    expect(topNav.state('showLoginModal')).toEqual(false);
    done();
  });
});
