import moxios from 'moxios';
import {
  postComment,
  getComments,
  clearPosted,
  loadingComment,
  postToggleCommentLikeAction,
  toggleCommentLikeAction
} from '../../../redux/actions/commentActions';

import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED,
  LIKE_COMMENT_ERROR,
  TOGGLE_COMMENT_LIKE,
  TOGGLE_COMMENT_LIKE_SUCCESS
} from '../../../redux/actionTypes';

describe('Test comment actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should fetch all comments with or without a token', async () => {
    const expectedResponse = {
      message: 'Comments successfully retrieved',
      comments: [
        {
          id: 2,
          articleId: 23,
          userId: 12,
          comment: 'just checking',
          highlighted: 'N/A',
          index: 0,
          totalLikes: 0,
          createdAt: '2019-04-25T02:31:17.654Z',
          updatedAt: '2019-04-25T02:31:17.654Z',
          User: {
            firstname: 'Adaeze',
            lastname: 'Odurukwe',
            username: 'deedee',
            email: 'daizyodurukwe@gmail.com',
            image: 'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png'
          }
        },
      ]
    };
    const mockArticleSlug = 'hjfhfh-1';
    const mockToken = 'jfhfhfhhdhd';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse })
        .then(() => moxios.wait(() => {
          const secondRequest = moxios.requests.mostRecent();
          secondRequest.respondWith({ status: 200, response: expectedResponse });
        }));
    });
    const result = await getComments(mockArticleSlug, mockToken);
    expect(result.type).toEqual(GET_COMMENTS);
    const otherResult = await getComments(mockArticleSlug);
    expect(otherResult.type).toEqual(GET_COMMENTS);
  });

  it('Should return error', async () => {
    const slug = 'me-myself-i';
    const mockRequest = {
      comment: ''
    };
    const errors = {
      errors: {
        comment: [
          'Comment must not be empty.'
        ]
      }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: errors });
    });
    const result = await postComment(slug, mockRequest);
    expect(result.type).toEqual(POST_COMMENT_ERROR);
  });

  it('Should post a comment', async () => {
    const slug = 'me-myself-i';
    const mockRequest = {
      comment: 'medicals suck'
    };
    const expectedResponse = {
      message: 'Comment created successfully',
      userComment: {
        id: 48,
        articleId: 23,
        comment: 'medicals suck',
        userId: 12,
        updatedAt: '2019-04-26T17:38:15.526Z',
        createdAt: '2019-04-26T17:38:15.526Z',
        highlighted: 'N/A',
        index: 0,
        totalLikes: 0
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await postComment(slug, mockRequest);
    expect(result.type).toEqual(POST_COMMENT);
  });

  it('Dispatches the auth loading action', () => {
    expect(loadingComment()).toEqual({ type: COMMENT_LOADING });
  });

  it('Dispatches the auth clear posted action', () => {
    expect(clearPosted()).toEqual({ type: CLEAR_POSTED });
  });
  it('Dispatches the toggle comment like action with the right payload', () => {
    expect(toggleCommentLikeAction(2)).toEqual({ type: TOGGLE_COMMENT_LIKE, payload: { id: 2 } });
  });
  it('Should dispatch the TOGGLE_COMMENT_LIKE_SUCCESS action when it sucessfully likes/unlikes a comment', async () => {
    const slug = 'me-myself-i';
    const expectedResponse = {
      message: 'Comment liked successfully',
    };
    const mockCommentId = 2;
    const mockToken = 'kfjfjjf';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await postToggleCommentLikeAction(slug, mockCommentId, mockToken);
    expect(result.type).toEqual(TOGGLE_COMMENT_LIKE_SUCCESS);
    expect(result.payload).toEqual(expectedResponse.message);
  });
  it('Should dispatch the LIKE_COMMENT_ERROR action when it fails to like/unlike a comment', async () => {
    const slug = 'me-myself-i';
    const expectedResponse = {
      message: 'Error',
    };
    const mockCommentId = 2;
    const mockToken = 'kfjfjjf';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 500, response: expectedResponse });
    });
    const result = await postToggleCommentLikeAction(slug, mockCommentId, mockToken);
    expect(result.type).toEqual(LIKE_COMMENT_ERROR);
    expect(result.payload).toEqual({ id: mockCommentId });
  });
});
