import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from '../../views/ProfilePage';

describe('Profile Component', () => {
  const profilePage = shallow(<ProfilePage />);

  it('should have a Profile present', () => {
    expect(profilePage.find('div').exists()).toBe(true);
  });
});
