import tagReducer, { initialState } from '../../../redux/reducers/tagReducer';
import { FETCH_TAGS, FETCH_TAGS_ERROR } from '../../../redux/actionTypes';

describe('Test for Tags Reducer', () => {
  it('should return tags', () => {
    const mockTagReducer = tagReducer(initialState, {
      type: FETCH_TAGS,
      payload: { article: true }
    });
    expect(mockTagReducer.tagList.article).toBe(true);
  });

  it('should return errors if tags cannot be fetched', () => {
    const mockTagReducer = tagReducer(initialState, {
      type: FETCH_TAGS_ERROR,
      payload: { error: true }
    });
    expect(mockTagReducer.errors.error).toBe(true);
  });
});
