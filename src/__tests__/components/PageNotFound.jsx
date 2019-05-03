import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../views/PageNotFound';

describe('Test page not found component', () => {
  it('it should render a page with the correct content', (done) => {
    const page = shallow(<PageNotFound />);

    expect(page.find('#not_found_wrapper').exists()).toBe(true);

    done();
  });
});
