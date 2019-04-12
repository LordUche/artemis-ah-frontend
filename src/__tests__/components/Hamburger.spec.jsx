/* eslint-disable require-jsdoc */
import React from 'react';
import { shallow } from 'enzyme';
import Hamburger from '../../components/Hamburger';

describe('test the hamburger when closed', () => {
  const mockToggleMenu = jest.fn();
  const hamburger = shallow(
    <Hamburger open={false} toggleMenu={mockToggleMenu}>
      <li id="link1">test nav link</li>
      <li id="link2">test nav link</li>
      <li id="link3">test nav link</li>
    </Hamburger>
  );
  it('should render the hamburger component', () => {
    expect(hamburger.find('div.hamburger_div').exists()).toBe(true);
    expect(hamburger.find('i#hamburger').exists()).toBe(true);
  });

  it('should contain the links passed in as children', () => {
    expect(hamburger.find('li#link1').exists()).toBe(true);
    expect(hamburger.find('li#link1').text()).toBe('test nav link');
    expect(hamburger.find('li#link2').exists()).toBe(true);
    expect(hamburger.find('li#link2').text()).toBe('test nav link');
    expect(hamburger.find('li#link3').exists()).toBe(true);
    expect(hamburger.find('li#link3').text()).toBe('test nav link');
  });

  it('should hide the links', () => {
    expect(hamburger.find('aside.hamburger_div_menu_aside').hasClass('hamburger_div_menu_aside_hide')).toBe(true);
    expect(hamburger.find('aside.hamburger_div_menu_aside').hasClass('hamburger_div_menu_aside_show')).toBe(false);
  });

  it('should fire the toggle method when the hamburger icon is clicked', () => {
    expect(mockToggleMenu.mock.calls.length).toEqual(0);

    hamburger.find('i#hamburger').simulate('click');

    expect(mockToggleMenu.mock.calls.length).toEqual(1);
  });
});

describe('test the hamburger when opened', () => {
  const mockToggleMenu = jest.fn();
  const hamburger = shallow(
    <Hamburger open toggleMenu={mockToggleMenu}>
      <li id="link1">test nav link</li>
      <li id="link2">test nav link</li>
      <li id="link3">test nav link</li>
    </Hamburger>
  );

  it('should show the links', () => {
    expect(hamburger.find('aside.hamburger_div_menu_aside').hasClass('hamburger_div_menu_aside_show')).toBe(true);
    expect(hamburger.find('aside.hamburger_div_menu_aside').hasClass('hamburger_div_menu_aside_hide')).toBe(false);
  });

  it('should have a backdrop', () => {
    expect(hamburger.find('div.hamburger_div_menu_backdrop').exists()).toBe(true);
  });

  it('should show the button for closing the menu', () => {
    expect(hamburger.find('span#hamburger-ex').exists()).toBe(true);
  });

  it('should close the menu when the close button, backdrop or a list item is clicked', () => {
    expect(mockToggleMenu.mock.calls.length).toEqual(0);

    hamburger.find('span#hamburger-ex').simulate('click');

    expect(mockToggleMenu.mock.calls.length).toEqual(1);

    hamburger.find('div.hamburger_div_menu_backdrop').simulate('click');

    expect(mockToggleMenu.mock.calls.length).toEqual(2);

    hamburger.find('ul').simulate('click');

    expect(mockToggleMenu.mock.calls.length).toEqual(3);
  });
});
