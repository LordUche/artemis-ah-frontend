import React from 'react';
import { shallow } from 'enzyme';
import HistoryPage from '../../views/HistoryPage';

describe('History Page Component', () => {
  const historyPage = shallow(<HistoryPage />);

  it('should have a div present', () => {
    expect(historyPage.find('div').exists()).toBe(true);
  });
});
