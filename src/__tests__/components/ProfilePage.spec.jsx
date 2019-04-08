import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from '../../views/ProfilePage';

describe('Footer Component', () => {
  const profilePage = shallow(<ProfilePage />);

  it('should have a Footer present', () => {
    expect(profilePage.find('header').exists()).toBe(true);
    expect(profilePage.find('header').text()).toEqual('This is your profile page!!');
  });
});
