import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import Navdropdown from '../../components/NavDropdown';

const dropdown = shallow(
  <Navdropdown parentLinkName="Explore">
    <li>
      <Link to="./filter?tag=Food">Food</Link>
    </li>
    <li>
      <Link to="./filter?tag=Technology">Technology</Link>
    </li>
    <li>
      <Link to="./filter?tag=Health">Health</Link>
    </li>
    <li>
      <Link to="./filter?tag=Finance">Finance</Link>
    </li>
    <li>
      <Link to="./filter?tag=Arts">Arts</Link>
    </li>
  </Navdropdown>
);
describe('Dropdown nav links', () => {
  it('should have 1 parent menu link', () => {
    expect(dropdown.find('.dropdown__trigger').length).toEqual(1);
  });

  it('should have 5 sub menu links', () => {
    expect(dropdown.find('ul li').length).toEqual(5);
  });
});


describe('Toggle dropdown', () => {
  it('should have dropdown closed by default', () => {
    expect(dropdown.state().dropdownShown).toBe(false);
  });

  it('should show dropdown', () => {
    const parentLink = dropdown.find('#explore');

    parentLink.simulate('click', { type: 'click', target: { id: 'explore' }, preventDefault: () => { } });
    const { dropdownShown } = dropdown.state();
    expect(dropdownShown).toEqual(true);
  });

  it('should hide dropdown', () => {
    dropdown.state().dropdownShown = true;

    dropdown.find('.dropdown__body').simulate('mouseleave', { type: 'mouseleave', target: { id: null } });
    const { dropdownShown } = dropdown.state();
    expect(dropdownShown).toEqual(false);
  });
});
