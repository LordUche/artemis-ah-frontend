import moxios from 'moxios';
import {
  fetchTagsAction,
  createArticleAction,
  clearErrorsAction,
  publishingArticleAction,
  getAllArticles
} from '../../../redux/actions/articleActions';

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
