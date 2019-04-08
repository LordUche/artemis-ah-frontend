import React from 'react';
import { shallow } from 'enzyme';
import AboutAH from '../../components/AboutAH';

describe('AboutAH Section Component', () => {
  const hero = shallow(<AboutAH />);

  it('should have segment title and description present', () => {
    expect(hero.find('.segment__title').exists()).toBe(true);
    expect(hero.find('.segment__text').exists()).toBe(true);
    expect(hero.find('.segment__title').text()).toEqual('How Authors Haven works');
    expect(hero.find('.segment__text').text())
      .toEqual('Create and share your story with an amazing community of authors and avid readers.');
  });

  it('should have 3 steps displayed', () => {
    expect(hero.find('.step__number').length).toEqual(3);
    expect(hero.find('.step__title').length).toEqual(3);
    expect(hero.find('.step__text').length).toEqual(3);
    expect(hero.find('.step__number').at(0).text()).toEqual('1');
    expect(hero.find('.step__number').at(1).text()).toEqual('2');
    expect(hero.find('.step__number').at(2).text()).toEqual('3');
    expect(hero.find('.step__title').at(0).text()).toEqual('Write');
    expect(hero.find('.step__title').at(1).text()).toEqual('Explore');
    expect(hero.find('.step__title').at(2).text()).toEqual('Connect');
    expect(hero.find('.step__text').at(0).text()).toEqual('Share your unique story with readers.');
    expect(hero.find('.step__text').at(1).text()).toEqual('Find stories from amazing authors.');
    expect(hero.find('.step__text').at(2).text()).toEqual('Engage with a community of writers.');
  });
});
