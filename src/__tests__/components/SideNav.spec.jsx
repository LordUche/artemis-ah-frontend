import React from 'react';
import { shallow } from 'enzyme';
import { SideNav } from '../../components/SideNav';

describe('test the side nav', () => {
  const sideNav = shallow(<SideNav isLoggedIn />);
  it('should return a div', () => {
    expect(sideNav.find('div').exists()).toBe(true);
  });
  sideNav.setProps({ isLoggedIn: false });
});
