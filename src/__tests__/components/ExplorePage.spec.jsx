import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ExplorePage, { Explore } from '../../views/Explore';
import reducers from '../../redux/reducers';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const mockFunction = jest.fn();
const loadError = { status: 500, server: 'server down' };
const returnedarticles = [
  {
    id: 3,
    slug: 'some-title-3',
    title: 'some title',
    description: 'some weird talk',
    rating: '0',
    totalClaps: 0,
    createdAt: '2019-04-17T20:26:46.344Z',
    updatedAt: '2019-04-17T20:26:46.347Z',
    User: {
      username: 'deedenedash',
      bio: 'n/a',
      image: 'https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/iReporter/avatar.png'
    },
    Tag: {
      name: 'Food'
    },
    readTime: {
      text: '< 1 min read',
      minutes: 0.05,
      time: 3000,
      words: 10
    }
  }
];
const returnedarticlesB = [
  {
    id: 3,
    slug: 'some-title-3',
    title: 'some title',
    description: 'some weird talk',
    rating: '0',
    totalClaps: 0,
    createdAt: '2019-04-17T20:26:46.344Z',
    updatedAt: '2019-04-17T20:26:46.347Z',
    User: {
      username: 'deedenedash',
      bio: 'n/a',
      image: 'https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/iReporter/avatar.png'
    },
    Tag: {},
    readTime: {
      text: '< 1 min read',
      minutes: 0.05,
      time: 3000,
      words: 10
    }
  }
];

describe('Explore Page', () => {
  it('Should mount successfully with required props', () => {
    const ExploreView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ExplorePage
            getArticles={mockFunction}
            articles={returnedarticlesB}
            loading={false}
            errors={{}}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(ExploreView.find('.explore').exists()).toEqual(true);
  });
  it('Should mount successfully with articles', () => {
    const ExploreView = shallow(
      <Explore getArticles={mockFunction} articles={returnedarticles} loading={false} errors={{}} />
    );
    expect(ExploreView.find('ArticleItem').exists()).toEqual(true);
  });
  it('Should show body error', () => {
    const ExploreView = shallow(
      <Explore getArticles={mockFunction} articles={[]} loading={false} errors={loadError} />
    );
    expect(ExploreView.find('ErrorComponent').exists()).toEqual(true);
  });
});

describe('Test Pagination feature for Profile page', () => {
  const mockGetArtcleFn = jest.fn();
  const explorePageComponent = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Explore
          errors={{}}
          articles={[{ readTime: { text: '' }, User: { username: 'Chrismarcel' } }]}
          totalNumberOfArticles={60}
          limit={20}
          getArticles={mockGetArtcleFn}
        />
      </BrowserRouter>
    </Provider>
  );
  it('should check that the pagination is correct', () => {
    expect(
      explorePageComponent
        .find('.page__arrow-next')
        .at(0)
        .prop('data-page')
    ).toEqual(2);
  });

  it('should move to the next page and trigger the handlePagination function', () => {
    const nextLink = explorePageComponent.find('#next-page');
    nextLink.simulate('click');
    expect(
      explorePageComponent
        .find('.page__arrow-next')
        .at(0)
        .prop('data-page')
    ).toEqual(3);
  });

  it('should move to the previous page and trigger the handlePagination function', () => {
    const nextLink = explorePageComponent.find('#next-page');
    nextLink.simulate('click');
    // Move to next page
    expect(
      explorePageComponent
        .find('.page__arrow-next')
        .at(0)
        .prop('data-page')
    ).toEqual(3);
    const previousLink = explorePageComponent.find('#previous-page');
    // Move to previous page
    previousLink.simulate('click');
    expect(
      explorePageComponent
        .find('.page__arrow-previous')
        .at(0)
        .prop('data-page')
    ).toEqual(1);
  });

  it('should move to the last page and trigger the handlePagination function', () => {
    const lastLink = explorePageComponent.find('#last-page');
    // Move to last page
    lastLink.simulate('click');
    expect(
      explorePageComponent
        .find('.page__arrow-last')
        .at(0)
        .prop('data-page')
    ).toEqual(3);
  });

  it('should move to the first page and trigger the handlePagination function', () => {
    const firstLink = explorePageComponent.find('#first-page');
    // Move to first page
    firstLink.simulate('click');
    expect(
      explorePageComponent
        .find('.page__arrow-first')
        .at(0)
        .prop('data-page')
    ).toEqual('1');
  });

  it('cover for when page number is not specified', () => {
    const randomLink = explorePageComponent.find('#first-page');
    // Pass in a random data attribute
    randomLink.simulate('click', { target: { id: 'random-page' } });
    expect(
      explorePageComponent
        .find('.page__arrow-first')
        .at(0)
        .prop('data-page')
    ).toEqual('1');
  });
});
