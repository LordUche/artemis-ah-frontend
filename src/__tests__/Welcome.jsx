import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../components/Welcome.jsx';

describe('test jest setup', () => {
    const wrapper = shallow(<Welcome />);
    it('should return a div', () => {
        expect(wrapper.find('div').exists()).toBe(true);
    });

    it('div should have a text - "Welcome to Author\'s haven frontend"', () => {
        expect(wrapper.find('div').text()).toEqual("Welcome to Author's haven frontend");
    })
})
