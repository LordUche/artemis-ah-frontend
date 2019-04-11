import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/Button';

describe('render button without image', () => {
  const mockClickHandler = jest.fn();
  const wrapper = shallow(<Button btnText="testBtn" customClass="biggestbutton" onClick={mockClickHandler} />);

  it('should return a button', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should have the text - "testBtn"', () => {
    expect(wrapper.find('button').text()).toEqual('testBtn');
  });

  it('should have the class - "biggestbutton"', () => {
    expect(wrapper.find('button').prop('className')).toContain('biggestbutton');
  });

  it('should fire click handler on click', () => {
    wrapper.find('button').simulate('click');
    expect(mockClickHandler.mock.calls.length).toEqual(1);
    wrapper.find('button').simulate('click');
    expect(mockClickHandler.mock.calls.length).toEqual(2);
  });

  it('should have the default class - "ah-btn" when none is provided', () => {
    const noClassWrapper = shallow(<Button btnText="testBtn" onClick={() => null} />);
    expect(noClassWrapper.find('button').prop('className')).toContain('ah-btn');
  });

  it('should not have an image', () => {
    expect(wrapper.find('img').exists()).toBe(false);
  });
});


describe('render button with image', () => {
  const wrapper = shallow(<Button btnText="testBtn" customClass="biggestbutton" imgSrc="abc.jpg" imgCustomClass="biggestimage" imgAltText="abc" onClick={() => null} />);

  it('should have an image', () => {
    expect(wrapper.find('img').exists()).toBe(true);
  });
  it('should give the image the custom class - "biggestimage"', () => {
    expect(wrapper.find('button').children('img').prop('className')).toContain('biggestimage');
  });
  it('should give the image the image source - "abc.jpg"', () => {
    expect(wrapper.find('img').prop('src')).toEqual('abc.jpg');
  });
  it('should give the image the alt text - "abc"', () => {
    expect(wrapper.find('img').prop('alt')).toEqual('abc');
  });
  it('should give the image a default alt text if none is provided', () => {
    const noAltWrapper = shallow(<Button btnText="testBtn" customClass="biggestbutton" imgSrc="abc.jpg" imgCustomClass="biggestimage" onClick={() => null} />);
    expect(noAltWrapper.find('img').prop('alt')).toEqual('testBtn Image');
  });

  it('should have default click handler if none is provided', () => {
    const noClickWrapper = shallow(<Button btnText="testBtn" customClass="biggestbutton" imgSrc="abc.jpg" imgCustomClass="biggestimage" imgAltText="abc" />);
    expect(noClickWrapper.find('button').prop('onClick')()).toEqual('No click handler');
  });
});
