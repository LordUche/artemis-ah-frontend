import React from 'react';
import { shallow } from 'enzyme';
import FeaturedCategories from '../../components/FeaturedCategories';

describe('Featured Categories Component', () => {
  const featuredCategories = shallow(<FeaturedCategories />);

  it('should have segment title and description present', () => {
    expect(featuredCategories.find('.segment__title').exists()).toBe(true);
    expect(featuredCategories.find('.segment__text').exists()).toBe(true);
    expect(featuredCategories.find('.segment__title').text()).toEqual('Featured Categories');
    expect(featuredCategories.find('.segment__text').text())
      .toEqual('Create and share your story with an amazing community of authors and avid readers.');
  });

  it('should have a featured articles section', () => {
    expect(featuredCategories.find('.featured__articles').exists()).toBe(true);
  });

  it('should have 5 featured cards', () => {
    expect(featuredCategories.find('.featured__card').length).toEqual(5);
    expect(featuredCategories.find('.segment__text').exists()).toBe(true);
    expect(featuredCategories.find('.segment__title').text()).toEqual('Featured Categories');
    expect(featuredCategories.find('.segment__text').text())
      .toEqual('Create and share your story with an amazing community of authors and avid readers.');
  });
});
