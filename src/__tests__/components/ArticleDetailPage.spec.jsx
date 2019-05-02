import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ArticleDetailPage, mapStateToProps } from '../../views/ArticleDetailPage';
import reducers from '../../redux/reducers';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
describe('Article details component', () => {
  const mockGetArticleFn = jest.fn();
  const mockGettingArticleFn = jest.fn();
  const mockClearErrorsFn = jest.fn();
  const mockRateArticleFn = jest.fn();

  const mockProps = {
    isGetting: true,
    articleGotten: {},
    errors: {},
    isLoggedIn: true,
    user: { username: 'ayo' },
    ratingData: { rating: 0 },
    match: {
      params: {
        articleSlug: 'abcd-1'
      }
    },
    token: '',
    getArticle: mockGetArticleFn,
    gettingArticle: mockGettingArticleFn,
    clearErrors: mockClearErrorsFn,
    rateArticleFn: mockRateArticleFn,
    articleClap: jest.fn()
  };
  const articleDetailPage = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ArticleDetailPage {...mockProps} />
      </BrowserRouter>
    </Provider>
  );

  it('renders the skeleton screen when getting the article details', () => {
    expect(articleDetailPage.find('div.article_detail_skeleton').exists()).toBe(true);
    expect(articleDetailPage.find('div.article_detail_header_img_skeleton').exists()).toBe(true);
  });

  it('clears errors and fires the gettingArticle and getArticle functions immediately it mounts', () => {
    expect(mockClearErrorsFn.mock.calls.length).toEqual(1);
    expect(mockGettingArticleFn.mock.calls.length).toEqual(1);
    expect(mockGetArticleFn.mock.calls.length).toEqual(1);
  });

  it('renders the article details when it has been gotten', () => {
    const mockArticle = {
      createdAt: new Date(),
      title: 'zxcvbnm',
      body: 'idjdfcnfhjfjfjf',
      coverUrl: 'abc.jpg',
      Tag: {
        name: 'Health'
      },
      User: {
        firstname: 'James',
        lastname: 'Okafor',
        username: 'jimmyturner'
      },
      readTime: {
        text: '2 mins read'
      },
      rating: '1.1'
    };
    const gottenArticleDetailPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ArticleDetailPage {...{ ...mockProps, articleGotten: mockArticle, isGetting: false }} />
        </BrowserRouter>
      </Provider>
    );
    const {
      title, User, Tag, body, coverUrl
    } = mockArticle;
    const { name } = Tag;
    const { firstname, lastname, username } = User;
    expect(gottenArticleDetailPage.find('h2.article_detail_header_info_title').exists()).toBe(true);
    expect(gottenArticleDetailPage.find('h2.article_detail_header_info_title').text()).toEqual(
      title
    );
    expect(gottenArticleDetailPage.find('article.article_detail_body').exists()).toBe(true);
    expect(gottenArticleDetailPage.find('article.article_detail_body_segment').text()).toEqual(
      body
    );
    expect(gottenArticleDetailPage.find('img.article_detail_header_img').exists()).toBe(true);
    expect(gottenArticleDetailPage.find('img.article_detail_header_img').prop('src')).toEqual(
      coverUrl
    );
    expect(gottenArticleDetailPage.find('span.article_detail_header_info_tag_span').exists()).toBe(
      true
    );
    expect(gottenArticleDetailPage.find('span.article_detail_header_info_tag_span').text()).toEqual(
      name
    );
    expect(
      gottenArticleDetailPage.find('a.article_detail_header_info_details_author').exists()
    ).toBe(true);
    expect(
      gottenArticleDetailPage.find('a.article_detail_header_info_details_author').prop('href')
    ).toEqual(`/profile/${username}`);
    expect(
      gottenArticleDetailPage.find('a.article_detail_header_info_details_author').text()
    ).toEqual(`${firstname} ${lastname}`);
  });

  it('renders the username when the author has no name recorded in tne database', () => {
    const mockArticle = {
      createdAt: new Date(),
      title: 'zxcvbnm',
      body: 'idjdfcnfhjfjfjf',
      coverUrl: 'abc.jpg',
      Tag: {
        name: 'Health'
      },
      User: {
        username: 'jimmyturner'
      },
      readTime: {
        text: '2 mins read'
      },
      rating: '1.1'
    };
    const gottenArticleDetailPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ArticleDetailPage {...{ ...mockProps, articleGotten: mockArticle, isGetting: false }} />
        </BrowserRouter>
      </Provider>
    );
    const { User } = mockArticle;
    const { username } = User;
    expect(
      gottenArticleDetailPage.find('a.article_detail_header_info_details_author').exists()
    ).toBe(true);
    expect(
      gottenArticleDetailPage.find('a.article_detail_header_info_details_author').prop('href')
    ).toEqual(`/profile/${username}`);
    expect(
      gottenArticleDetailPage.find('a.article_detail_header_info_details_author').text()
    ).toEqual(`${username}`);
    expect(gottenArticleDetailPage.find('h3.article_detail_author_info_name').exists()).toBe(true);
    expect(gottenArticleDetailPage.find('h3.article_detail_author_info_name').text()).toEqual(
      `${username}`
    );
  });

  it('indicates when an article has not been rated before', () => {
    const mockArticle = {
      createdAt: new Date(),
      title: 'zxcvbnm',
      body: 'idjdfcnfhjfjfjf',
      coverUrl: 'abc.jpg',
      Tag: {
        name: 'Health'
      },
      User: {
        username: 'jimmyturner'
      },
      readTime: {
        text: '2 mins read'
      },
      rating: '0'
    };
    const gottenArticleDetailPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ArticleDetailPage {...{ ...mockProps, articleGotten: mockArticle, isGetting: false }} />
        </BrowserRouter>
      </Provider>
    );
    expect(gottenArticleDetailPage.find('p.article_detail_rating_average').exists()).toBe(true);
    expect(gottenArticleDetailPage.find('p.article_detail_rating_average').text()).toEqual(
      'This article has not yet been rated'
    );
  });

  it('hides the follow button when user is not logged in', () => {
    const mockArticle = {
      createdAt: new Date(),
      title: 'zxcvbnm',
      body: 'idjdfcnfhjfjfjf',
      coverUrl: 'abc.jpg',
      Tag: {
        name: 'Health'
      },
      User: {
        username: 'jimmyturner'
      },
      readTime: {
        text: '2 mins read'
      },
      rating: '0'
    };
    const gottenArticleDetailPage = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ArticleDetailPage
            {...{
              ...mockProps,
              articleGotten: mockArticle,
              isGetting: false,
              isLoggedIn: false
            }}
          />
        </BrowserRouter>
      </Provider>
    );
    expect(gottenArticleDetailPage.find('button.article_detail_author_follow_btn').exists()).toBe(
      false
    );
  });

  it('redirects to the not found page when article is not found', () => {
    const notFoundArticleDetailPage = shallow(
      <ArticleDetailPage {...{ ...mockProps, errors: { message: 'article not found' } }} />
    );
    expect(notFoundArticleDetailPage.find('Redirect').exists()).toBe(true);
    expect(notFoundArticleDetailPage.find('Redirect').prop('to')).toEqual('/not-found');
  });

  it('renders error message when there is a server/network error', () => {
    const errorArticleDetailPage = shallow(
      <ArticleDetailPage
        {...{
          ...mockProps,
          errors: { message: "Can't get Article right now, please try again later" }
        }}
      />
    );
    expect(errorArticleDetailPage.find('p.article_detail_error').exists()).toBe(true);
    expect(errorArticleDetailPage.find('p.article_detail_error').text()).toEqual(
      "Can't get Article right now, please try again later"
    );
  });

  it("maps the store data to it's props", () => {
    const mockStore = {
      auth: {
        token: 'jkj',
        isLoggedIn: false
      },
      article: {
        errors: {},
        isGetting: false,
        articleGotten: {}
      },
      user: {
        username: 'ayo'
      }
    };

    const articleDetailPageProps = mapStateToProps(mockStore);
    expect(articleDetailPageProps.token).toEqual(mockStore.auth.token);
    expect(articleDetailPageProps.isLoggedIn).toEqual(mockStore.auth.isLoggedIn);
    expect(articleDetailPageProps.errors).toEqual(mockStore.article.errors);
    expect(articleDetailPageProps.isGetting).toEqual(mockStore.article.isGetting);
    expect(articleDetailPageProps.articleGotten).toEqual(mockStore.article.articleGotten);
  });

  it('should trigger the rateArticle function', () => {
    const mockArticleProps = {
      match: { params: { articleSlug: 'http://path.to/article/slug' } },
      isLoggedIn: true,
      clearErrors: jest.fn(),
      gettingArticle: jest.fn(),
      getArticle: jest.fn(),
      rateArticleFn: jest.fn(),
      ratingData: { rating: 0 },
      errors: { message: '' },
      articleGotten: {
        User: { username: 'ayo' },
        readTime: { text: '' },
        Tag: { name: '' },
        createdAt: '',
        totalClaps: 0,
        rated: false,
        body: '\n'
      },
      username: 'Chris',
      isGetting: false,
      coverUrl: ''
    };
    const singleArticlePage = shallow(<ArticleDetailPage {...mockArticleProps} />);
    const ratingStar = singleArticlePage.find('.fa-star').at(0);
    ratingStar.simulate('click', { target: { id: 1 } });
  });
  describe('Test bookmark feature', () => {
    let articlePage;

    beforeAll((done) => {
      const mockArticle = {
        createdAt: new Date(),
        title: 'zxcvbnm',
        body: 'idjdfcnfhjfjfjf',
        coverUrl: 'abc.jpg',
        Tag: {
          name: 'Health'
        },
        User: {
          username: 'jimmyturner'
        },
        readTime: {
          text: '2 mins read'
        },
        rating: '0',
        isBookmarked: false
      };

      articlePage = shallow(
        <ArticleDetailPage
          {...{
            ...mockProps,
            articleGotten: mockArticle,
            isGetting: false,
            bookmarkArticle: () => {
              articlePage.setProps({
                articleGotten: {
                  ...mockArticle,
                  isBookmarked: true
                }
              });
            },
            removeBookmark: () => {
              articlePage.setProps({
                articleGotten: {
                  ...mockArticle,
                  isBookmarked: false
                }
              });
            }
          }}
        />
      );

      done();
    });

    it('It should have an "Add to Bookmark" option', (done) => {
      expect(articlePage.find('.article_detail_bookmark').exists()).toBe(true);
      expect(articlePage.find('.article_detail_bookmark.bookmarked').exists()).toBe(false);
      expect(articlePage.find('.article_detail_bookmark span').text()).toBe('Add to Bookmark');

      done();
    });

    it('"Add to bookmark" option should change to "remove from bookmark" when it is clicked', (done) => {
      articlePage.find('.article_detail_bookmark').simulate('click', { preventDefault: () => 1 });
      articlePage.update();

      expect(articlePage.find('.article_detail_bookmark').exists()).toBe(true);
      expect(articlePage.find('.article_detail_bookmark.bookmarked').exists()).toBe(true);
      expect(articlePage.find('.article_detail_bookmark span').text()).toBe('Remove from Bookmark');

      done();
    });

    it('"Remove from bookmark" button should change to "Add to bookmark" when it is called the second time', (done) => {
      articlePage.find('.article_detail_bookmark').simulate('click', { preventDefault: () => 1 });
      articlePage.update();

      expect(articlePage.find('.article_detail_bookmark').exists()).toBe(true);
      expect(articlePage.find('.article_detail_bookmark.bookmarked').exists()).toBe(false);
      expect(articlePage.find('.article_detail_bookmark span').text()).toBe('Add to Bookmark');
      articlePage.instance().userClap();
      articlePage.instance().closeCommentBox();
      done();
    });
  });
});
