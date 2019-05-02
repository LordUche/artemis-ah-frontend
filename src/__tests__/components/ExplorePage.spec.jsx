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
    body: 'Adaeze-Salisu-Damola',
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
    body: 'Adaeze-Salisu-Damola',
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

const match = {
  isExact: true,
  params: {},
  path: '/explore',
  url: '/explore'
};

const matchb = {
  isExact: true,
  params: { tag: 'Food' },
  path: '/explore/:tag',
  url: '/explore/Food'
};

const matchc = {
  isExact: true,
  params: { tag: 'Food' },
  path: '/explore/Food',
  url: '/explore/Food'
};

const history = {
  action: 'PUSH',
  block: mockFunction,
  createHref: mockFunction,
  go: mockFunction,
  goBack: mockFunction,
  goForward: mockFunction,
  length: mockFunction,
  listen: mockFunction,
  location: { pathname: '/explore' },
  push: mockFunction,
  replace: mockFunction
};

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
            match={match}
            history={history}
            getFiltered={mockFunction}
            clear={mockFunction}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(ExploreView.find('.explore').exists()).toEqual(true);
  });

  it('Should mount successfully with articles', () => {
    const ExploreView = shallow(
      <Explore
        getArticles={mockFunction}
        articles={returnedarticles}
        loading={false}
        errors={{ message: 'No article found with that match' }}
        match={matchc}
        history={history}
        clear={mockFunction}
      />
    );

    expect(ExploreView.find('ArticleItem').exists()).toEqual(false);
  });

  it('Should show body error', () => {
    const ExploreView = shallow(
      <Explore
        getArticles={mockFunction}
        articles={[]}
        loading={false}
        errors={loadError}
        match={match}
      />
    );
    expect(ExploreView.find('ErrorComponent').exists()).toEqual(true);
  });
});

describe('Test filter', () => {
  it('should load filtered articles', () => {
    const ExploreView = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ExplorePage
            getArticles={mockFunction}
            articles={returnedarticles}
            loading={false}
            errors={{}}
            match={matchb}
            history={history}
            getFiltered={mockFunction}
            clear={mockFunction}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(ExploreView.find('.explore').exists()).toEqual(true);
  });
});

describe('Test Pagination feature for Explore page', () => {
  const mockGetArtcleFn = jest.fn();
  it('should check that the pagination is correct', () => {
    const explorePageComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Explore
            errors={{}}
            articles={returnedarticles}
            totalNumberOfArticles={60}
            limit={20}
            getArticles={mockGetArtcleFn}
            match={match}
            history={history}
          />
        </BrowserRouter>
      </Provider>
    );
    expect(
      explorePageComponent
        .find('.page__arrow-next')
        .at(0)
        .prop('data-page')
    ).toEqual(2);
  });

  it('should move to the next page and trigger the handlePagination function', () => {
    const explorePageComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Explore
            errors={{}}
            articles={returnedarticles}
            totalNumberOfArticles={60}
            limit={20}
            getArticles={mockGetArtcleFn}
            match={match}
            history={history}
          />
        </BrowserRouter>
      </Provider>
    );
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
    const explorePageComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Explore
            errors={{}}
            articles={returnedarticles}
            totalNumberOfArticles={60}
            limit={20}
            match={match}
            history={history}
            getArticles={mockGetArtcleFn}
          />
        </BrowserRouter>
      </Provider>
    );
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
    const explorePageComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Explore
            errors={{}}
            articles={returnedarticles}
            totalNumberOfArticles={60}
            limit={20}
            getArticles={mockGetArtcleFn}
            match={match}
            history={history}
          />
        </BrowserRouter>
      </Provider>
    );
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
    const explorePageComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Explore
            errors={{}}
            articles={returnedarticles}
            totalNumberOfArticles={60}
            limit={20}
            getArticles={mockGetArtcleFn}
            match={match}
            history={history}
          />
        </BrowserRouter>
      </Provider>
    );
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
    const explorePageComponent = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Explore
            errors={{}}
            articles={returnedarticles}
            totalNumberOfArticles={60}
            limit={20}
            getArticles={mockGetArtcleFn}
            match={match}
            history={history}
          />
        </BrowserRouter>
      </Provider>
    );
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
