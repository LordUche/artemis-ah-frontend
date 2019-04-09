import React from 'react';
import { shallow } from 'enzyme';
import ReadingStatsPage from '../../views/ReadingStatsPage';

describe('ReadingStats Page Component', () => {
  const readingStatsPage = shallow(<ReadingStatsPage />);

  it('should have a div present', () => {
    expect(readingStatsPage.find('div').exists()).toBe(true);
  });
});
