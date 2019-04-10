import React from 'react';
import { shallow } from 'enzyme';
import TopNav from '../../components/TopNav';

describe('test the side nav', () => {
  const topNav = shallow(<TopNav />);
  it('should return a div', () => {
    expect(topNav.find('div').exists()).toBe(true);
  });

  topNav.setState({ auth: true });
  it('should return a div', () => {
    expect(topNav.find('div').exists()).toBe(true);
  });

  it('It should call the componentWillMount method in the header component which in turn checks for screen resize', () => {
    // Test for 500px
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
  const hamburger = shallow(<TopNav />);
  it('should contain an i tag', () => {
    expect(hamburger.find('i').exists()).toBe(true);
  });

  it('It should call the componentDidMount method in the header component which in turn checks for screen resize and onload event handlers', () => {
    // Test for 500px
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
