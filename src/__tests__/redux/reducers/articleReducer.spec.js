import articleReducer, { initialState } from '../../../redux/reducers/articleReducer';
import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_ERROR,
  CLEAR_ARTICLE_ERROR,
  PUBLISHING_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLES_ERROR,
  GETTING_ARTICLE,
  GOT_ARTICLE,
  ERROR_GETTING_ARTICLE,
  ARTICLE_BOOKMARK_ADDED,
  ARTICLE_BOOKMARK_REMOVED,
  BOOKMARK_LOADING,
  DELETED_BOOKMARK,
  ERROR_DELETING_BOOKMARKS,
  ERROR_GETTING_BOOKMARKS,
  GOT_BOOKMARKS
} from '../../../redux/actionTypes';
import getMockArticles from '../../../__mocks__/articles';


describe('Test for Article Reducer', () => {
  it('should validate create articles reducer', () => {
    const mockPayload = {
      article: {
        tagId: 2,
        title: 'This is a long string',
        description: 'This is a description text '.repeat(10),
        body: 'This is a body text '.repeat(50),
        slug: 'abcd-1'
      }
    };
    const mockArticleReducer = articleReducer(initialState, {
      type: CREATE_ARTICLE,
      payload: mockPayload
    });
    expect(mockArticleReducer.isPublishing).toBe(false);
    expect(mockArticleReducer.articleData.tagId).toEqual(2);
    expect(mockArticleReducer.articleData.title).toEqual('This is a long string');
    expect(mockArticleReducer.articleData.description).toEqual(
      'This is a description text '.repeat(10)
    );
    expect(mockArticleReducer.articleData.body).toEqual('This is a body text '.repeat(50));
    expect(mockArticleReducer.newArticleSlug).toEqual('abcd-1');
  });

  it('should validate create article title error', () => {
    const mockErrorPayload = { title: ['Title is required'] };
    const mockArticleReducer = articleReducer(initialState, {
      type: CREATE_ARTICLE_ERROR,
      payload: mockErrorPayload
    });
    expect(mockArticleReducer.errors.title).toEqual(['Title is required']);
    mockErrorPayload.title = ['minimum character length for title should be 5'];
    expect(mockArticleReducer.errors.title).toEqual([
      'minimum character length for title should be 5'
    ]);
    mockErrorPayload.title = ['maximum character length for title should be 200'];
    expect(mockArticleReducer.errors.title).toEqual([
      'maximum character length for title should be 200'
    ]);
  });

  it('should validate create article description error', () => {
    const mockErrorPayload = { title: ['Description is required'] };
    const mockArticleReducer = articleReducer(initialState, {
      type: CREATE_ARTICLE_ERROR,
      payload: mockErrorPayload
    });
    expect(mockArticleReducer.errors.title).toEqual(['Description is required']);
    mockErrorPayload.title = ['minimum character length for description should be 5'];
    expect(mockArticleReducer.errors.title[0]).toEqual(
      'minimum character length for description should be 5'
    );
    mockErrorPayload.title = ['maximum character length for description should be 1000'];
    expect(mockArticleReducer.errors.title[0]).toEqual(
      'maximum character length for description should be 1000'
    );
  });

  it('should validate create article body error', () => {
    const mockErrorPayload = { title: ['Body is required'] };
    const mockArticleReducer = articleReducer(initialState, {
      type: CREATE_ARTICLE_ERROR,
      payload: mockErrorPayload
    });
    expect(mockArticleReducer.errors.title).toEqual(['Body is required']);
    mockErrorPayload.title = ['minimum character length for body should be 10'];
    expect(mockArticleReducer.errors.title).toEqual([
      'minimum character length for body should be 10'
    ]);
  });

  it('should validate clear article error reducer', () => {
    const mockPayload = {};
    const mockArticleReducer = articleReducer(initialState, {
      type: CLEAR_ARTICLE_ERROR,
      payload: mockPayload
    });
    expect(mockArticleReducer.errors).toEqual({});
  });

  it('should validate publishing article reducer', () => {
    const payload = {
      isPublishing: true
    };
    const mockArticleReducer = articleReducer(initialState, { type: PUBLISHING_ARTICLE, payload });
    expect(mockArticleReducer.errors).toEqual({});
    expect(mockArticleReducer.isPublishing).toBe(true);
  });

  it('Should update article', () => {
    const mockArticle = [
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
          image:
            'https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/iReporter/avatar.png'
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
    const mockArticleReducer = articleReducer(initialState, {
      type: GET_ARTICLES,
      payload: { articles: mockArticle }
    });
    expect(mockArticleReducer.loading).toEqual(false);
    expect(mockArticleReducer.articles[0]).toEqual(mockArticle[0]);
  });

  it('Should update error', () => {
    const mockErrorPayload = { status: 500 };
    const mockArticleReducer = articleReducer(initialState, {
      type: GET_ARTICLES_ERROR,
      payload: mockErrorPayload
    });
    expect(mockArticleReducer.errors.status).toEqual(500);
  });
  it('should update isGetting when GETTING_ARTICLE action is dispatched', () => {
    const mockState = articleReducer(initialState, { type: GETTING_ARTICLE });
    expect(mockState.isGetting).toBe(true);
    expect(mockState.errors).toEqual({});
  });

  it('should update state when GOT_ARTICLE action is dispatched', () => {
    const mockPayload = {
      article: {
        slug: 'hfhgh-1',
        id: 1,
        title: 'hfhfhf',
        body: 'jdjfgfgfhf',
        description: 'iugfgfhhfjjfjfj'
      },
      clap: true
    };
    const mockState = articleReducer(initialState, { type: GOT_ARTICLE, payload: mockPayload });
    expect(mockState.articleGotten.title).toEqual(mockPayload.article.title);
    expect(mockState.articleGotten.body).toEqual(mockPayload.article.body);
    expect(mockState.articleGotten.description).toEqual(mockPayload.article.description);
    expect(mockState.articleGotten.clap).toEqual(true);
    expect(mockState.isGetting).toBe(false);
    expect(mockState.errors).toEqual({});
  });

  it('should update state when ERROR_GETTING_ARTICLE action is dispatched', () => {
    const mockPayload = {
      message: 'Network error'
    };
    const mockState = articleReducer(initialState, {
      type: ERROR_GETTING_ARTICLE,
      payload: mockPayload
    });
    expect(mockState.errors).toEqual(mockPayload);
    expect(mockState.articleGotten).toEqual({});
    expect(mockState.isGetting).toBe(false);
  });

  it('should mock the article reducer', () => {
    const data1 = { type: 'EDIT_ARTICLE', payload: {} };
    const data2 = { type: 'SAVE_EDITED_ARTICLE', payload: {} };
    const data3 = { type: 'OPEN_DELETE_CONFIRMATION_MODAL', payload: {} };
    const data4 = { type: 'CLOSE_DELETE_CONFIRMATION_MODAL', payload: {} };
    articleReducer(initialState, data1);
    articleReducer(initialState, data2);
    articleReducer(initialState, data3);
    articleReducer(initialState, data4);
  });

  describe('Test article bookmarking feature', () => {
    let newState;

    beforeAll((done) => {
      const mockArticle = [
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
            image:
              'https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/iReporter/avatar.png'
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
      newState = articleReducer(initialState, {
        type: GET_ARTICLES,
        payload: { articles: mockArticle }
      });

      done();
    });

    it('should set isBookmarked to true when ARTICLE_BOOKMARK_ADDED is dispatched', (done) => {
      newState = articleReducer(newState, {
        type: ARTICLE_BOOKMARK_ADDED
      });

      expect(newState.articleGotten.isBookmarked).toBe(true);

      done();
    });

    it('should set isBookmarked to false when ARTICLE_BOOKMARK_REMOVED is dispatched', (done) => {
      newState = articleReducer(newState, {
        type: ARTICLE_BOOKMARK_REMOVED
      });

      expect(newState.articleGotten.isBookmarked).toBe(false);

      done();
    });
  });

  describe('Test actions to load bookmarks and perform actions on bookmarks', () => {
    it('should update state when BOOKMARK_LOADING action is dispatched', () => {
      const mockState = articleReducer(initialState, { type: BOOKMARK_LOADING });
      expect(mockState.loading).toBe(true);
      expect(mockState.errors).toEqual({});
      expect(mockState.deletedBookmark).toEqual({});
    });
    it('should update state when ERROR_DELETING_BOOKMARKS action is dispatched', () => {
      const mockState = articleReducer(initialState, { type: ERROR_DELETING_BOOKMARKS, payload: { message: 'Server Error' } });
      expect(mockState.loading).toBe(false);
      expect(mockState.errors).toEqual({ message: 'Server Error' });
      expect(mockState.bookmarkDeleted).toEqual({});
    });
    it('should update state when ERROR_GETTING_BOOKMARKS action is dispatched', () => {
      const mockState = articleReducer(initialState, { type: ERROR_GETTING_BOOKMARKS, payload: { message: 'Server Error' } });
      expect(mockState.loading).toBe(false);
      expect(mockState.errors).toEqual({ message: 'Server Error' });
    });
    it('should update state and store bookmarked articles when GOT_BOOKMARKS action is dispatched', () => {
      const mockArticles = getMockArticles(5);
      const mockState = articleReducer(initialState, { type: GOT_BOOKMARKS, payload: mockArticles });
      expect(mockState.loading).toBe(false);
      expect(mockState.errors).toEqual({});
      expect(mockState.bookmarkedArticles).toEqual(mockArticles);
    });
    it('should update state when DELETED_BOOKMARK action is dispatched', () => {
      const mockArticle = getMockArticles(1)[0];
      const initialReducerState = articleReducer(initialState, {
        type: GOT_BOOKMARKS,
        payload: [mockArticle]
      });
      expect(initialReducerState.bookmarkedArticles).toEqual([mockArticle]);
      const mockState = articleReducer(initialReducerState, {
        type: DELETED_BOOKMARK,
        payload: mockArticle
      });
      expect(mockState.loading).toBe(false);
      expect(mockState.errors).toEqual({});
      expect(mockState.bookmarkDeleted).toEqual(mockArticle);
      expect(mockState.bookmarkedArticles).toEqual([]);
    });
  });
});
