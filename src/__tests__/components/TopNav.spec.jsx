import React from 'react';
import { shallow } from 'enzyme';
import { TopNav, mapStateToProps } from '../../components/TopNav';

describe('map state to props for topNav', () => {
  it('should do what I like', () => {
    expect(
      mapStateToProps({
        auth: { isLoggedIn: true },
        user: { image: 'image_URL', username: 'shaolinmkz' }
      })
    ).toEqual({ isLoggedIn: true, image: 'image_URL', username: 'shaolinmkz' });
  });
});

describe('test the side nav', () => {
  const topNav = shallow(<TopNav isLoggedIn={false} />);
  const topNavII = shallow(<TopNav isLoggedIn />);
  it('should return a div for unauthenticated users', () => {
    expect(topNav.find('div').exists()).toBe(true);
  });

  it('should return a div for authenticated', () => {
    expect(topNavII.find('div').exists()).toBe(true);
  });

  it('should return a div', () => {
    expect(topNav.find('div').exists()).toBe(true);
  });

  it('It should call the componentWillMount method in the header component which in turn checks for screen resize', () => {
    // Test for 700px
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));
    topNav.instance().componentWillMount();

    // Test for 1200px
    global.innerWidth = 1200;
    global.dispatchEvent(new Event('resize'));
    topNav.instance().componentWillMount();
  });
});

describe('test the hamburger menu', () => {
  const hamburger = shallow(<TopNav isLoggedIn={false} />);
  it('should contain an i tag', () => {
    expect(hamburger.find('i').exists()).toBe(true);
  });

  it('It should call the componentDidMount method in the header component which in turn checks for screen resize and onload event handlers', () => {
    // Test for 700px
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));
    hamburger.instance().componentDidMount();

    global.dispatchEvent(new Event('load'));
    hamburger.instance().componentDidMount();
    // Test for 1200px
    hamburger.setState({ reset: false });
    global.innerWidth = 1200;
    global.dispatchEvent(new Event('load'));
    hamburger.instance().componentDidMount();

    global.dispatchEvent(new Event('resize'));
    hamburger.instance().componentDidMount();
  });
});
