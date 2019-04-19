import profileReducer, { getInitialState } from '../../../redux/reducers/profileReducer';
import {
  PROFILE_USER_DETAILS_FETCH_ERROR,
  DELETE_ARTICLE,
  SAVE_EDITED_ARTICLE,
  PROFILE_ARTICLES_FETCH_ERROR,
  PROFILE_FOLLOWERS_FETCH_ERROR,
  PROFILE_FOLLOWING_FETCH_ERROR,
  PROFILE_DETAILS_UPDATING,
  PROFILE_DETAILS_UPDATED,
  PROFILE_DETAILS_UPDATE_ERROR,
  PROFILE_RESET_EDIT_STATE
} from '../../../redux/actionTypes';

describe('some of the profile reducer', () => {
  it('should test the PROFILE_USER_DETAILS_FETCH_ERROR action type', () => {
    const payload = { type: PROFILE_USER_DETAILS_FETCH_ERROR, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the DELETE_ARTICLE action type', () => {
    const payload = { type: DELETE_ARTICLE, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the SAVE_EDITED_ARTICLE action type', () => {
    const payload = { type: SAVE_EDITED_ARTICLE, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_ARTICLES_FETCH_ERROR action type', () => {
    const payload = { type: PROFILE_ARTICLES_FETCH_ERROR, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_FOLLOWERS_FETCH_ERROR action type', () => {
    const payload = { type: PROFILE_FOLLOWERS_FETCH_ERROR, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_FOLLOWING_FETCH_ERROR action type', () => {
    const payload = { type: PROFILE_FOLLOWING_FETCH_ERROR, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_DETAILS_UPDATING action type', () => {
    const payload = { type: PROFILE_DETAILS_UPDATING, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_DETAILS_UPDATED action type', () => {
    const payload = { type: PROFILE_DETAILS_UPDATED, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_DETAILS_UPDATE_ERROR action type', () => {
    const payload = { type: PROFILE_DETAILS_UPDATE_ERROR, data: {} };
    profileReducer(getInitialState(), payload);
  });
  it('should test the PROFILE_RESET_EDIT_STATE action type', () => {
    const payload = { type: PROFILE_RESET_EDIT_STATE, data: {} };
    profileReducer(getInitialState(), payload);
  });
});
