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
});

describe('test the hamburger menu', () => {
  const topNav = shallow(<TopNav />);

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
