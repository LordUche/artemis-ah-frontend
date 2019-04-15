import articleReducer, { initialState } from '../../../redux/reducers/articleReducer';
import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_ERROR,
  CLEAR_ARTICLE_ERROR,
  PUBLISHING_ARTICLE
} from '../../../redux/actionTypes';

describe('Test for Article Reducer', () => {
  it('should validate create articles reducer', () => {
    const mockPayload = {
      tagId: 2,
      title: 'This is a long string',
      description: 'This is a description text '.repeat(10),
      body: 'This is a body text '.repeat(50)
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
});