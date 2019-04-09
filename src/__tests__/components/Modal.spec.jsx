import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../components/Modal';

describe('render modal', () => {
  const mockCloseHandler = jest.fn();
  const wrapper = shallow(
    <Modal modalHeader="testModalHeader" onClose={mockCloseHandler} customClass="testModalClass">
      <p className="testModalData">testModalData</p>
    </Modal>
  );

  it('should return the modal', () => {
    expect(wrapper.find('div.ah_modal_backdrop_wrapper').exists()).toBe(true);
    expect(wrapper.find('div.ah_modal_backdrop').exists()).toBe(true);
    expect(wrapper.find('div.ah_modal').exists()).toBe(true);
    expect(wrapper.find('button.ah_modal_close').exists()).toBe(true);
    expect(wrapper.find('header.ah_modal_header').exists()).toBe(true);
    expect(wrapper.find('img.ah_modal_header_img').exists()).toBe(true);
    expect(wrapper.find('h2.ah_modal_header_text').exists()).toBe(true);
  });

  it('should fire close handler when close button or backdrop is clicked', () => {
    // Close Button
    wrapper.find('button.ah_modal_close').simulate('click');
    expect(mockCloseHandler.mock.calls.length).toEqual(1);

    // Backdrop
    wrapper.find('div.ah_modal_backdrop').simulate('click');
    expect(mockCloseHandler.mock.calls.length).toEqual(2);
  });

  it('should have the class - "testModalClass"', () => {
    expect(wrapper.find('div.ah_modal').prop('className')).toContain('testModalClass');
  });

  it('should have the header - "testModalHeader"', () => {
    expect(wrapper.find('h2.ah_modal_header_text').text()).toEqual('testModalHeader');
  });

  it('should render the child HTML component', () => {
    expect(wrapper.find('p.testModalData').exists()).toBe(true);
    expect(wrapper.find('p.testModalData').text()).toEqual('testModalData');
  });
});
