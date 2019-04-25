import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../components/Pagination';

describe('Test Pagination Component', () => {
  const mockFn = jest.fn();
  const pagination = shallow(
    <Pagination currentPage={2} numberOfPages={5} handlePagination={mockFn} />
  );
  it('should have a pagination class', () => {
    expect(pagination.find('.pagination').exists()).toBe(true);
  });
  it('should test that user is on the first page', () => {
    pagination.setProps({ currentPage: 1 });
    expect(pagination.find('.page__first').hasClass('disabled')).toBe(true);
    expect(pagination.find('.page__previous').hasClass('disabled')).toBe(true);
  });
  it('should test that user is on the last page', () => {
    pagination.setProps({ currentPage: 5 });
    expect(pagination.find('.page__last').hasClass('disabled')).toBe(true);
    expect(pagination.find('.page__next').hasClass('disabled')).toBe(true);
  });
});
