import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../components/SideNav';

describe('test the side nav', () => {
  const sideNav = shallow(<SideNav />);
  it('should return a div', () => {
    expect(sideNav.find('div').exists()).toBe(true);
  });

  it('should test the bookmarks hover state', () => {
    const firstLink = sideNav.find('li#bookmarkLink');

    // Testing Initial State
    expect(sideNav.state('hoverBookmark')).toBe(false);
    firstLink.simulate('mouseleave');

    // Testing state after mouseleave
    expect(sideNav.state('hoverBookmark')).toBe(false);
    // Testing state after mouseover
    firstLink.simulate('mouseenter');
    expect(sideNav.state('hoverBookmark')).toBe(true);
  });

  it('should test the handle history hover state', () => {
    const thirdLink = sideNav.find('li#historyLink');
    // Testing Initial State
    expect(sideNav.state('hoverHistory')).toBe(false);
    thirdLink.simulate('mouseleave');

    // Testing state after mouseleave
    expect(sideNav.state('hoverHistory')).toBe(false);

    // Testing state after mouseenter
    thirdLink.simulate('mouseenter');
    expect(sideNav.state('hoverHistory')).toBe(true);
  });

  it('should test the handle reading state hover state', () => {
    const secondLink = sideNav.find('li#reading-stats-Link');
    // Testing Initial State
    expect(sideNav.state('hoverReadingStats')).toBe(false);
    secondLink.simulate('mouseleave');

    // Testing state after mouseleave
    expect(sideNav.state('hoverReadingStats')).toBe(false);

    // Testing state after mouseenter
    secondLink.simulate('mouseenter');
    expect(sideNav.state('hoverReadingStats')).toBe(true);
  });

  it('should test the handle setting hover state', () => {
    const forthLink = sideNav.find('li#settingsLink');
    // Testing Initial State
    expect(sideNav.state('hoverSettings')).toBe(false);
    forthLink.simulate('mouseleave');

    // Testing state after mouseleave
    expect(sideNav.state('hoverSettings')).toBe(false);

    // Testing state after mouseenter
    forthLink.simulate('mouseenter');
    expect(sideNav.state('hoverSettings')).toBe(true);
  });
});
