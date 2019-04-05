import React from 'react';
import { shallow } from 'enzyme';
import InputField from '../../components/InputField';

describe('render input without making it required', () => {
  const mockChangeHandler = jest.fn();
  const wrapper = shallow(<InputField placeHolder="testInput" customClass="biggestinput" onChange={mockChangeHandler} inputType="text" inputName="email" />);

  it('should return an input field', () => {
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should have the placeholder - "testInput"', () => {
    expect(wrapper.find('input').prop('placeholder')).toEqual('testInput');
  });

  it('should have the class - "biggestinput"', () => {
    expect(wrapper.find('input').prop('className')).toContain('biggestinput');
  });

  it('should fire change handler on change', () => {
    wrapper.find('input').simulate('change');
    expect(mockChangeHandler.mock.calls.length).toEqual(1);
    wrapper.find('input').simulate('change');
    expect(mockChangeHandler.mock.calls.length).toEqual(2);
  });

  it('should have the default class - "ah-input" when none is provided', () => {
    const noClassWrapper = shallow(<InputField onChange={mockChangeHandler} inputType="text" inputName="email" placeHolder="testInput" />);
    expect(noClassWrapper.find('input').prop('className')).toContain('ah-input');
  });

  it('should not be required', () => {
    expect(wrapper.find('input[required]').exists()).toBe(false);
  });

  it('should not render the required asterisk', () => {
    expect(wrapper.find('span.ah-input-required-asterisk').exists()).toBe(false);
  });
});


describe('render required input', () => {
  const mockChangeHandler = jest.fn();
  const wrapper = shallow(<InputField placeHolder="testInput" customClass="biggestinput" onChange={mockChangeHandler} inputType="text" inputName="email" required />);

  it('should be required', () => {
    expect(wrapper.find('input[required]').exists()).toBe(true);
  });
});

describe('render input with required asterisk', () => {
  const mockChangeHandler = jest.fn();
  const wrapper = shallow(<InputField placeHolder="testInput" customClass="biggestinput" onChange={mockChangeHandler} inputType="text" inputName="email" required showRequiredAsterisk />);

  it('should render the asterisk', () => {
    expect(wrapper.find('span.ah-input-required-asterisk').exists()).toBe(true);
  });
});
