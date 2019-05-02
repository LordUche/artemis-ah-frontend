import moxios from 'moxios';
import {
  postComment,
  getComments,
  clearPosted,
  loadingComment,
  editCommentLoading,
  clearEditComment,
  editComment,
  editHistoryCommentLoading,
  getCommentEditHistory
} from '../../../redux/actions/commentActions';

import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED,
} from '../../../redux/actionTypes';

describe('Test comment actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should fetch all comments', async () => {
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
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await getComments();
    expect(result.type).toEqual(GET_COMMENTS);
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

  it('Should update the comment', async () => {
    const slug = 'me-myself-i';
    const mockRequest = {
      comment: 'Comment must not be empty.'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: 'successfully updated' });
    });
    const result = await editComment(slug, mockRequest, 29);
    expect(result.type).toEqual('EDIT_COMMENT');
  });

  it('Should throw an error while trying to update a comment', async () => {
    const slug = 'me-myself-i';
    const mockRequest = {
      comment: ''
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: 'Update failed' });
    });
    const result = await editComment(slug, mockRequest, 29);
    expect(result.type).toEqual('EDIT_COMMENT_ERROR');
  });

  it('Should fetch users edit comment history', async () => {
    const expectedResponse = {
      message: 'Retrieved successfully',
      history: {
        comment: 'just checking',
        updatedAt: '2019-04-25T02:31:17.654Z'
      }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedResponse });
    });
    const result = await getCommentEditHistory();
    expect(result.type).toEqual('GET_EDIT_COMMENT_HISTORY');
  });

  it('Dispatches the auth loading action', () => {
    expect(loadingComment()).toEqual({ type: COMMENT_LOADING });
  });

  it('Dispatches the auth clear posted action', () => {
    expect(clearPosted()).toEqual({ type: CLEAR_POSTED });
  });

  it('Dispatches the edit comment loading action', () => {
    expect(editCommentLoading()).toEqual({ type: 'EDIT_LOADING' });
  });

  it('Dispatches the clear edit commment action', () => {
    expect(clearEditComment()).toEqual({ type: 'CLEAR_EDITED' });
  });
  it('Dispatches the get edit commment history loading action', () => {
    expect(editHistoryCommentLoading()).toEqual({ type: 'GET_COMMENT_EDIT_HISTORY_LOADING' });
  });
});
