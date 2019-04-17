import React from 'react';
import { mount } from 'enzyme';
import FeaturedCategories from '../../components/FeaturedCategories';

const mockHistoryPush = jest.fn();
const history = { push: mockHistoryPush };
describe('Featured Categories Component', () => {
  const featuredCategories = mount(<FeaturedCategories history={history} />);

  it('should have segment title and description present', () => {
    expect(featuredCategories.find('.segment__title').exists()).toBe(true);
    expect(featuredCategories.find('.segment__text').exists()).toBe(true);
    expect(featuredCategories.find('.segment__title').text()).toEqual('Featured Categories');
    expect(featuredCategories.find('.segment__text').text()).toEqual(
      'Create and share your story with an amazing community of authors and avid readers.'
    );
  });

  it('should have a featured articles section', () => {
    expect(featuredCategories.find('.featured__articles').exists()).toBe(true);
  });

  it('should test the explore articles button', () => {
    const exploreBtn = featuredCategories.find('.btn-explore');
    featuredCategories.setState({
      featuredArticles: [
        {
          id: 1,
          title: 'Title',
          Tag: { name: 'Art' },
          slug: 'none',
          coverUrl: 'image.png'
        }
      ]
    });
    featuredCategories.instance().setViewportState(400);
    featuredCategories.instance().setViewportState(900);
    featuredCategories.instance().setViewportState(1100);
    featuredCategories.instance().setViewportState(2500);
    exploreBtn.simulate('click');
    featuredCategories.setState({ slidesToShow: 1, width: '100%' });
    featuredCategories.update();
  });

  it('It should test for when the viewport is resized', () => {
    // Test for <= 805px
    global.innerWidth = 360;
    global.dispatchEvent(new Event('resize'));
    featuredCategories.instance().componentDidMount();

    global.dispatchEvent(new Event('load'));
    featuredCategories.instance().componentDidMount();

    // Test for >805px && <= 1000px
    global.innerWidth = 900;
    global.dispatchEvent(new Event('resize'));
    featuredCategories.instance().componentDidMount();

    global.dispatchEvent(new Event('load'));
    featuredCategories.instance().componentDidMount();

    // Test for >1000px && <=1200px
    global.innerWidth = 1000;
    global.dispatchEvent(new Event('resize'));
    featuredCategories.instance().componentDidMount();

    global.dispatchEvent(new Event('load'));
    featuredCategories.instance().componentDidMount();
  });
});

describe('Test fetching of articles', () => {
  const featuredCategories = mount(<FeaturedCategories history={history} />);
  it('should fetch articles', async () => {
    await featuredCategories.instance().retrieveFeaturedArticles();
  });
});
