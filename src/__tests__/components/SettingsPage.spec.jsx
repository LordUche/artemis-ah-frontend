import React from 'react';
import { shallow } from 'enzyme';
import SettingsPage from '../../views/SettingsPage';

describe('Settings Page Component', () => {
  const settingsPage = shallow(<SettingsPage />);

  it('should have a div present', () => {
    expect(settingsPage.find('div').exists()).toBe(true);
  });
});
