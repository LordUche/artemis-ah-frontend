import React from 'react';
import { shallow } from 'enzyme';
import Toast from '../../utils/Toast';

describe('the toast function', () => {
  const toast = shallow(<Toast />);
  it('should return a toast message', () => {
    expect(toast.find('div').exists()).toBe(true);
  });
});
