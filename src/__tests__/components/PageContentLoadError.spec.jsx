import React from 'react';
import { shallow } from 'enzyme';
import PageContentLoadError from '../../components/PageContentLoadError';

let clickStatus = 'default';

/**
 * @description Mock functions called when the retry button is clicked.
 * @returns {undefined}
 */
const onRetry = () => {
  clickStatus = 'clicked';
};

let page;

beforeAll(() => {
  page = shallow(
    <PageContentLoadError
      onRetry={onRetry}
    />
  );
});

describe('Test PageContentLoadError component', () => {
  it('It should load the correct conrent', (done) => {
    expect(page.find('.page-content-load-error').exists()).toBe(true);
    expect(page.find('.page-content-load-error__title').exists()).toBe(true);
    expect(page.find('.page-content-load-error__btn-area Button').exists()).toBe(true);

    done();
  });

  it('It should trigger onRetry event when the Retry button is clicked', (done) => {
    page.find('.page-content-load-error__btn-area Button').simulate('click');

    expect(clickStatus).toBe('clicked');

    done();
  });
});
