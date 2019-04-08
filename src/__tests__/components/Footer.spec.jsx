import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  const footer = shallow(<Footer />);

  it('should have a Footer present', () => {
    expect(footer.find('footer').exists()).toBe(true);
    expect(footer.find('footer').text()).toEqual(`© ${new Date().getFullYear()} Authors Haven`);
  });
});
