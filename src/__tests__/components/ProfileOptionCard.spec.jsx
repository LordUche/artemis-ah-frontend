import React from 'react';
import { shallow } from 'enzyme';
import ProfileOptionCard from '../../components/ProfileOptionCard';

describe('Profile Card Component', () => {
  const profileCard = shallow(<ProfileOptionCard headerText="dummyHeaderText" headerImg={<svg className="dummySvg" />} />);
  it('should render the component', () => {
    expect(profileCard.find('div.profile_option_card_wrapper').exists()).toBe(true);
    expect(profileCard.find('section.profile_option_card').exists()).toBe(true);
    expect(profileCard.find('h3').text()).toBe('dummyHeaderText');
    expect(profileCard.find('svg.dummySvg').exists()).toBe(true);
  });
});
