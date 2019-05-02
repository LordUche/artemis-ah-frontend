import { commentReducer, initialState } from '../../../redux/reducers/commentReducer';
import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED
} from '../../../redux/actionTypes';

const errors = {
  errors: {
    comment: ['Comment must not be empty.']
  }
};

const returned = {
  comment: ['Comment must not be empty.']
};

const commentUpdate = {
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
    image:
      'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png'
  }
};

const articleComments = [
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
      image:
        'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png'
    }
  },
  {
    id: 3,
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
      image:
        'https://res.cloudinary.com/artemisah/image/upload/v1554333407/authorshaven/ah-avatar.png'
    }
  }
];

const state = {
  ...initialState,
  articleComments
};

describe('Comment Reducer', () => {
  it('Should update comment', () => {
    const mockommentReducer = commentReducer(initialState, {
      type: GET_COMMENTS,
      payload: articleComments
    });
    expect(mockommentReducer.articleComments[0]).toEqual(articleComments[0]);
  });

  it('Should set loading to true', () => {
    const mockommentReducer = commentReducer(initialState, {
      type: COMMENT_LOADING
    });
    expect(mockommentReducer.loading).toEqual(true);
  });

  it('Should set posted to true', () => {
    const mockommentReducer = commentReducer(initialState, {
      type: POST_COMMENT
    });
    expect(mockommentReducer.posted).toEqual(true);
  });

  it('Should set posted to false', () => {
    const mockommentReducer = commentReducer(initialState, {
      type: CLEAR_POSTED
    });
    expect(mockommentReducer.posted).toEqual(false);
  });

  it('Should update errors', () => {
    const mockommentReducer = commentReducer(initialState, {
      type: POST_COMMENT_ERROR,
      payload: errors
    });
    expect(mockommentReducer.errors).toEqual(returned);
  });

  it('Should filter and update the new comment in the store', () => {
    commentReducer(state, {
      type: 'EDIT_COMMENT',
      payload: commentUpdate
    });
  });

  it('Should test the edit comment error type', () => {
    commentReducer(state, {
      type: 'EDIT_COMMENT_ERROR'
    });
  });
  it('Should test the edit comment loading type', () => {
    commentReducer(state, {
      type: 'EDIT_LOADING'
    });
  });
  it('Should test the clear edited comment type', () => {
    commentReducer(state, {
      type: 'CLEAR_EDITED'
    });
  });
});
