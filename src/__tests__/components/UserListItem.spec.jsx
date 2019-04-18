import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import UserListItem from '../../components/UserListItem';

describe('Test user list item', () => {
  it('it should load the user list item', (done) => {
    const component = mount(
      <BrowserRouter>
        <UserListItem
          pictureUrl="http_link_to_img"
          fullname="Pirate Author"
          username="pirate"
          about="I copy people&apos;s articles."
        />
      </BrowserRouter>
    );

    expect(component.find('.user-list-item').exists()).toBe(true);

    const className = '.user-list-item__inner__details_wrapper';
    expect(component.find(`${className}__fullname a`).text()).toBe('Pirate Author');
    expect(component.find(`${className}__username a`).text()).toBe('@pirate');
    expect(component.find(`${className}__about`).text()).toBe('I copy people\'s articles.');

    done();
  });
});
