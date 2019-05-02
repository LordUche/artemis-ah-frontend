import moxios from 'moxios';
import {
  fetchTagsAction,
  createArticleAction,
  clearErrorsAction,
  publishingArticleAction,
  getArticleAction,
  gettingArticleAction,
  deleteArticleAction,
  saveEditedArticleAction,
  confirmArticleDeleteAction,
  closeArticleDeleteModalAction,
  getAllArticles,
  bookmarkLoadingAction,
  deleteBookmarkAction,
  getBookmarksAction,
  bookmarkArticleAction,
  removeBookmarkAction,
  rateArticleAction,
  ratingArticleAction,
  editArticle
} from '../../../redux/actions/articleActions';

import {
  GETTING_ARTICLE,
  GOT_ARTICLE,
  ERROR_GETTING_ARTICLE,
  OPEN_DELETE_CONFIRMATION_MODAL,
  CLOSE_DELETE_CONFIRMATION_MODAL,
  BOOKMARK_LOADING,
  DELETED_BOOKMARK,
  ERROR_DELETING_BOOKMARKS,
  ERROR_GETTING_BOOKMARKS,
  GOT_BOOKMARKS
} from '../../../redux/actionTypes';
import getMockArticles from '../../../__mocks__/articles';

describe('Test get all articles action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return fetched articles', async () => {
    const expectedResponse = {
      articles: [
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
      ],
      total: 3,
      page: 1,
      limit: 20
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await getAllArticles();
    expect(result.type).toEqual('GET_ARTICLES');
  });
  it('should return an error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: {} });
    });
    const result = await getAllArticles();
    expect(result.type).toEqual('GET_ARTICLES_ERROR');
  });
});

describe('Testing article tag actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch an article tag', async () => {
    const expectedTags = {
      tags: [
        {
          id: 1,
          name: 'Food',
          createdAt: '2019-04-11T20:43:41.086Z',
          updatedAt: '2019-04-11T20:43:41.086Z'
        },
        {
          id: 2,
          name: 'Technology',
          createdAt: '2019-04-11T20:43:41.086Z',
          updatedAt: '2019-04-11T20:43:41.086Z'
        }
      ]
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedTags });
    });
    const result = await fetchTagsAction();
    expect(result.type).toEqual('FETCH_TAGS');
    expect(result.payload[0].id).toEqual(1);
    expect(result.payload[0].name).toEqual('Food');
  });

  it('should return an error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: {} });
    });
    const result = await fetchTagsAction();
    expect(result.type).toEqual('FETCH_TAGS_ERROR');
  });
});

describe('Testing article action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should clear article errors', () => {
    clearErrorsAction();
  });

  it('should show publishing status', () => {
    publishingArticleAction();
  });

  it('should create article', async () => {
    const mockRequest = {
      title: 'My random title by a random user',
      body: 'Go on fam again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    const expectedResponse = {
      article: {
        rating: '0',
        id: 1,
        tagId: 1,
        title: 'My random title by a random user',
        description: 'Go on fam again!!! Wooohooo!!!',
        body: 'Go on fam again!!! Wooohooo!!!'
      }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: expectedResponse });
    });

    const result = await createArticleAction(mockRequest);
    expect(result.type).toEqual('CREATE_ARTICLE');
  });

  it('should throw an error for status code 4XX', async () => {
    const mockRequest = {
      title: 'My random title by a random user',
      body: 'Go on fam again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    const mockResponseError = {
      errors: { title: ['Title must be specified'] }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: mockResponseError });
    });

    const result = await createArticleAction(mockRequest);
    expect(result.type).toEqual('CREATE_ARTICLE_ERROR');
  });

  it('should throw an error for status code 5XX', async () => {
    const mockRequest = {
      title: 'My random title by a random user',
      body: 'Go on fam again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500 });
    });

    const result = await createArticleAction(mockRequest);
    expect(result.type).toEqual('CREATE_ARTICLE_ERROR');
  });
});

describe('Testing edit article action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should clear article errors', () => {
    clearErrorsAction();
  });

  it('should show publishing status', () => {
    publishingArticleAction();
  });

  it('should edit an article', async () => {
    const mockRequest = {
      title: 'My new random title by a random user',
      body: 'Go on fam again and again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    const expectedResponse = {
      article: {
        rating: '0',
        id: 1,
        tagId: 1,
        title: 'My new random title by a random user',
        description: 'Go on fam again and again!!! Wooohooo!!!',
        body: 'Go on fam again!!! Wooohooo!!!'
      }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    const result = await saveEditedArticleAction(mockRequest);
    expect(result.type).toEqual('SAVE_EDITED_ARTICLE');
  });

  it('should throw an error for status code 4XX', async () => {
    const mockRequest = {
      title: 'My random title by a random user',
      body: 'Go on fam again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    const mockResponseError = {
      errors: { title: ['Title must be specified'] }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: mockResponseError });
    });

    const result = await saveEditedArticleAction(mockRequest);
    expect(result.type).toEqual('FETCH_DELETE_ERROR');
  });

  it('should throw an error for status code 5XX', async () => {
    const mockRequest = {
      title: 'My random title by a random user',
      body: 'Go on fam again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500 });
    });

    const result = await saveEditedArticleAction(mockRequest);
    expect(result.type).toEqual('FETCH_DELETE_ERROR');
  });
});

describe('Testing the delete article action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should clear article errors', () => {
    clearErrorsAction();
  });

  it('should show publishing status', () => {
    publishingArticleAction();
  });

  it('should delete an article', async () => {
    const mockRequest = 'article deleted successfully';
    const expectedResponse = 'article deleted successfully';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });

    const result = await deleteArticleAction(mockRequest);
    expect(result.type).toEqual('DELETE_ARTICLE');
  });

  it('should throw an error for status code 4XX', async () => {
    const mockRequest = 'slug-slugs-3';
    const mockResponseError = {
      errors: { title: ['Title must be specified'] }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: mockResponseError });
    });

    const result = await deleteArticleAction(mockRequest);
    expect(result.type).toEqual('FETCH_DELETE_ERROR');
  });

  it('should throw an error for status code 5XX', async () => {
    const mockRequest = {
      title: 'My random title by a random user',
      body: 'Go on fam again!!! Wooohooo!!!',
      description: 'Go on fam again!!! Wooohooo!!!',
      tagId: 1
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500 });
    });

    const result = await deleteArticleAction(mockRequest);
    expect(result.type).toEqual('FETCH_DELETE_ERROR');
  });
});

describe('Testing get article action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return the GOT_ARTICLE action when article was gotten successfully', async () => {
    const mockSlug = 'abc-1';
    const mockResponse = {
      article: {
        id: 1,
        title: 'abcd',
        slug: mockSlug
      }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockResponse });
    });
    const result = await getArticleAction(mockSlug);
    expect(result.type).toEqual(GOT_ARTICLE);
    expect(result.payload).toEqual(mockResponse);
  });

  it('should return the ERROR_GETTING_ARTICLE action when there is a descriptive error', async () => {
    const mockSlug = 'abc-1';
    const mockToken = '12345';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: { data: 'Server Error' } });
    });
    const result = await getArticleAction(mockSlug, mockToken);
    expect(result.type).toEqual(ERROR_GETTING_ARTICLE);
  });
  it('should return the ERROR_GETTING_ARTICLE action when there is no descriptive error', async () => {
    const mockSlug = 'abc-1';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500 });
    });
    const result = await getArticleAction(mockSlug);
    expect(result.type).toEqual(ERROR_GETTING_ARTICLE);
  });
  it('should return the GETTING_ARTICLE action', () => {
    const result = gettingArticleAction();
    expect(result.type).toEqual(GETTING_ARTICLE);
  });
});

describe('Delete article modal', () => {
  it('it should return an action type', () => {
    expect(confirmArticleDeleteAction().type).toEqual(OPEN_DELETE_CONFIRMATION_MODAL);
    expect(closeArticleDeleteModalAction().type).toEqual(CLOSE_DELETE_CONFIRMATION_MODAL);
  });
});

describe('Test bookmark actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return bookmarked articles when the user has some', async () => {
    const mockResponse = {
      userBookmarks: getMockArticles(8)
    };
    const mockToken = 'abcd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockResponse });
    });
    const { type, payload } = await getBookmarksAction(mockToken);
    expect(type).toEqual(GOT_BOOKMARKS);
    expect(payload).toEqual(mockResponse.userBookmarks);
  });

  it('should return empty array when the user has no bookmarked articles', async () => {
    const mockResponse = {
      message: 'You have no bookmarks'
    };
    const mockToken = 'abcd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockResponse });
    });
    const { type, payload } = await getBookmarksAction(mockToken);
    expect(type).toEqual(GOT_BOOKMARKS);
    expect(payload).toEqual([]);
  });

  it('should return an error when there was an error getting bookmarks', async () => {
    const mockResponse = {
      message: 'Server Error'
    };
    const mockToken = 'abcd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: mockResponse });
    });
    const { type, payload } = await getBookmarksAction(mockToken);
    expect(type).toEqual(ERROR_GETTING_BOOKMARKS);
    expect(payload.message).toEqual(mockResponse.message);
  });
  it('should dispatch the DELETED_BOOKMARK type action when bookmarked article is deleted successfully', async () => {
    const mockResponse = {
      message: 'You have successfully removed the article from your bookmarks'
    };
    const mockArticle = getMockArticles(1)[0];
    const mockToken = 'abcd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: mockResponse });
    });
    const { type, payload } = await deleteBookmarkAction(mockArticle, mockToken);
    expect(type).toEqual(DELETED_BOOKMARK);
    expect(payload).toEqual(mockArticle);
  });
  it('should dispatch the ERROR_DELETING_BOOKMARKS type action with error message supplied when bookmarked article is not deleted successfully', async () => {
    const mockResponse = {
      message: 'Bad Request'
    };
    const mockArticle = getMockArticles(1)[0];
    const mockToken = 'abcd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: mockResponse });
    });
    const { type, payload } = await deleteBookmarkAction(mockArticle, mockToken);
    expect(type).toEqual(ERROR_DELETING_BOOKMARKS);
    expect(payload).toEqual(mockResponse);
  });
  it('should dispatch the ERROR_DELETING_BOOKMARKS type action when bookmarked article is not deleted successfully due to server errors', async () => {
    const mockArticle = getMockArticles(1)[0];
    const mockToken = 'abcd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500 });
    });
    const { type, payload } = await deleteBookmarkAction(mockArticle, mockToken);
    expect(type).toEqual(ERROR_DELETING_BOOKMARKS);
    expect(payload).toEqual({ message: 'Server Error' });
  });
  it('should dispatch the BOOKMARK_LOADING type action when bookmark operations are going on', () => {
    const { type } = bookmarkLoadingAction();
    expect(type).toEqual(BOOKMARK_LOADING);
  });
});

describe('Bookmark feature', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should bookmark an article', async () => {
    const expectedResponse = {
      message: 'Bookmarked successfully'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await bookmarkArticleAction();
    expect(result.type).toEqual('ARTICLE_BOOKMARK_ADDED');
  });

  it('Should fail when trying to bookmark an article', async () => {
    const expectedResponse = {
      message: 'Bookmark failed'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });
    const result = await bookmarkArticleAction();
    expect(result.type).toEqual('ARTICLE_BOOKMARK_ADD_ERROR');
  });

  it('Should remove bookmark from an article', async () => {
    const expectedResponse = {
      message: 'Remove bookmark successfully'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await removeBookmarkAction();
    expect(result.type).toEqual('ARTICLE_BOOKMARK_REMOVED');
  });

  it('Should fail when trying to remove bookmark from an article', async () => {
    const expectedResponse = {
      message: 'Remove bookmark failed'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });
    const result = await removeBookmarkAction();
    expect(result.type).toEqual('ARTICLE_BOOKMARK_REMOVE_ERROR');
  });
});

describe('Rate article feature', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should rate an article', async () => {
    const expectedResponse = {
      message: 'Rating successfully'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await rateArticleAction();
    expect(result.type).toEqual('RATED_ARTICLE');
  });

  it('Should return an error while rating an article', async () => {
    const expectedResponse = {
      message: 'Rating unsuccessfully'
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: expectedResponse });
    });
    const result = await rateArticleAction();
    expect(result.type).toEqual('RATING_ARTICLE_ERROR');
  });

  it('should dispatch the RATING_ARTICLE type action when rating action is operational', () => {
    const { type } = ratingArticleAction();
    expect(type).toEqual('RATING_ARTICLE');
  });

  it('should dispatch the RATING_ARTICLE type action when rating action is operational', () => {
    const { type, payload } = editArticle({ cardData: 'data' });
    expect(type).toEqual('EDIT_ARTICLE');
    expect(payload).toEqual({ cardData: 'data' });
  });
});
