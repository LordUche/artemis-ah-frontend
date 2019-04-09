import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../components/logo';

describe('test the logo', () => {
  const logo = shallow(<Logo />);
  it('should contain an div tag', () => {
    expect(logo.find('div').exists()).toBe(true);
  });
});
