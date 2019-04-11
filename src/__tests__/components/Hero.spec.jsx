import React from 'react';
import { shallow } from 'enzyme';
import Hero from '../../components/Hero';
import logo from '../../assets/img/logo.svg';

describe('Hero Component', () => {
  const mockHideLoginModal = jest.fn();
  const mockRevealLoginModal = jest.fn();
  const mockSearchHandler = jest.fn();
  const mockSmoothScrollListener = jest.fn();
  const hero = shallow(
    <Hero
      showLoginModal
      hideLoginModal={mockHideLoginModal}
      revealLoginModal={mockRevealLoginModal}
      smoothScrollListener={mockSmoothScrollListener}
      isLoggedIn={false}
    />
  );

  it('should have a logo present', () => {
    expect(hero.find('.hero__logo > img').exists()).toBe(true);
    expect(hero.find('.hero__logo > img').prop('src')).toEqual(logo);
  });

  it('should have navigation links present', () => {
    expect(hero.find('.hero__nav--links').exists()).toBe(true);
  });

  it('should have 2 call to action buttons', () => {
    expect(hero.find('.hero__cta').children().length).toEqual(2);
  });

  it('should have a large call to action text', () => {
    expect(hero.find('.hero__text--large').text()).toEqual('Authors Haven');
    expect(hero.find('.hero__text--normal').text()).toEqual(
      'Building a community of like minded authors.'
    );
  });

  it('should have a round navigation button', () => {
    expect(hero.find('.scroll').exists()).toBe(true);
  });

  it('should show login modal on click', () => {
    expect(mockRevealLoginModal.mock.calls.length).toBe(0);
    hero.find('#login-link').simulate('click');
    expect(mockRevealLoginModal.mock.calls.length).toBe(1);
  });

  it('should have search icon present', () => {
    expect(hero.find('.hero__nav--search').exists()).toBe(true);
  });

  it('should simulate search icon click', () => {
    const wrapper = shallow(
      <span role="presentation" onClick={mockSearchHandler}>
        <i className="fas fa-search hero__nav--search" />
      </span>
    );
    wrapper.find('span').simulate('click');
    expect(mockSearchHandler).toHaveBeenCalled();
  });

  it('should change the component state', () => {
    hero.find('span#searchIcon').simulate('click');
    expect(hero.state('displaySearchBar')).toEqual(true);
  });
});

describe('Hero Component', () => {
  const mockHideLoginModal = jest.fn();
  const mockRevealLoginModal = jest.fn();
  const mockSmoothScrollListener = jest.fn();
  const hero = shallow(
    <Hero
      showLoginModal
      hideLoginModal={mockHideLoginModal}
      revealLoginModal={mockRevealLoginModal}
      smoothScrollListener={mockSmoothScrollListener}
      isLoggedIn={false}
    />
  );
  const { hideSearchField } = new Hero();

  hero.setState({ displaySearchBar: true });

  it('should have search input', () => {
    expect(hero.find('.hero__nav--search_wrapper').exists()).toBe(true);
  });

  it('button click should show search input', () => {
    hero
      .find('input.hero__nav--search_input')
      .simulate('keypress', { key: 'Enter', target: { name: 'search' } });
    expect(hero).toMatchObject({});
  });

  it('button click should show search input', () => {
    hero
      .find('input.hero__nav--search_input')
      .simulate('change', { target: { name: 'searchQuery', value: 'abc' } });
    expect(hero.state('searchQuery')).toEqual('abc');
    hideSearchField({ target: {} });
  });

  it('button click should show search input', () => {
    hero.find('section.hero').simulate('click', { target: { name: 'search', value: 'abc' } });
    expect(hero).toMatchObject({});
  });
});
