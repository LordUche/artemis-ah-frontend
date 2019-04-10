import React from 'react';
import { shallow } from 'enzyme';
import Hamburger from '../../components/Hamburger';
import TopNav from '../../components/TopNav';

const { openMenu, closeMenu } = new TopNav();

describe('test the Hamburger', () => {
  const hamburger = shallow(
    <Hamburger
      closeMenu={closeMenu}
      openMenu={openMenu}
      hamburgerStateClose="inline-block"
      hamburgerStateOpen="none"
    />
  );
  it('should return a i and span tag', () => {
    expect(hamburger.find('i').exists()).toBe(true);
    expect(hamburger.find('span').exists()).toBe(true);
  });

  it('Test to simulate menu dropdown click', () => {
    const topNav = shallow(<TopNav />);
    const hamburgerClose = hamburger.find('i#hamburger');
    const hamburgerOpen = hamburger.find('span#hamburger-ex');

    // Resize screen for mobile testing
    global.innerWidth = 600;
    global.dispatchEvent(new Event('resize'));

    // Testing Initial State
    expect(topNav.state('hamburgerStateClose')).toBe('inline-block');
    hamburgerClose.simulate('click');

    // Testing state after click
    expect(topNav.state('hamburgerStateOpen')).toBe('none');

    // Testing state after click
    hamburgerOpen.simulate('click');
    expect(topNav.state('hamburgerStateClose')).toBe('inline-block');
    expect(topNav.state('hamburgerStateOpen')).toBe('none');
  });
});
