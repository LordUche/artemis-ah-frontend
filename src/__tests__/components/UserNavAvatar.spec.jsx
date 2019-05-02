import React from 'react';
import { shallow } from 'enzyme';
import { UserNavAvatar } from '../../components/userNavAvartar';

describe('test the user avatar', () => {
  const userAvatar = shallow(<UserNavAvatar />);
  it('should contain an anchor tag which is a parent to an image tag', () => {
    expect(userAvatar.find('img').exists()).toBe(true);
  });
});
