import profileReducer, { getInitialState } from '../../../redux/reducers/profileReducer';
import {
  PROFILE_USER_DETAILS_FETCHED,
  PROFILE_USER_DETAILS_FETCH_ERROR,
  PROFILE_ARTICLES_FETCHING,
  PROFILE_ARTICLES_FETCHED,
  PROFILE_ARTICLES_FETCH_ERROR,
  PROFILE_FOLLOWERS_FETCHING,
  PROFILE_FOLLOWERS_FETCHED,
  PROFILE_FOLLOWERS_FETCH_ERROR,
  PROFILE_FOLLOWING_FETCHING,
  PROFILE_FOLLOWING_FETCHED,
  PROFILE_FOLLOWING_FETCH_ERROR,
  PROFILE_DETAILS_UPDATING,
  PROFILE_DETAILS_UPDATED,
  PROFILE_DETAILS_UPDATE_ERROR,
  FOLLOW_ACTION_FOLLOWING_IN_PROGRESS,
  FOLLOW_ACTION_UNFOLLOWING_IN_PROGRESS,
  FOLLOW_ACTION_FOLLOWED,
  FOLLOW_ACTION_UNFOLLOWED,
  FOLLOW_ACTION_FOLLOW_FAILED,
  FOLLOW_ACTION_UNFOLLOW_FAILED,
  PROFILE_RESET_EDIT_STATE,
  PROFILE_RESET,
  DELETE_ARTICLE,
  SAVE_EDITED_ARTICLE
} from '../../../redux/actionTypes';
import {
  TAB_ARTICLES,
  TAB_FOLLOWING,
  TAB_FOLLOWERS,
  CONTENT_STATE_DEFAULT,
  CONTENT_STATE_FETCHED,
  CONTENT_STATE_FETCHING,
  CONTENT_STATE_FETCHING_FAILED,
  CONTENT_STATE_UPDATING,
  CONTENT_STATE_UPDATED,
  CONTENT_STATE_UPDATE_FAILED,
} from '../../../constants/profileConstants';

let state;

describe('Test profile reducer', () => {
  it('It should return the initial state.', (done) => {
    state = profileReducer(undefined, {});

    expect(typeof state).toBe('object');

    const stateKeys = Object.keys(state);
    expect(stateKeys.indexOf('user')).not.toBe(-1);
    expect(stateKeys.indexOf('tabContent')).not.toBe(-1);

    done();
  });

  it('It should set state to error when the user data failed to fetch', (done) => {
    state = profileReducer(state, {
      type: PROFILE_USER_DETAILS_FETCH_ERROR,
    });

    expect(state.user.contentState).toBe(CONTENT_STATE_FETCHING_FAILED);

    done();
  });

  it('It should set state to fetched when user data is fetched', (done) => {
    state = profileReducer(state, {
      type: PROFILE_USER_DETAILS_FETCHED,
      data: {
        user: {
          firstname: 'Reducer',
          lastname: 'Tester',
          username: 'redtester',
          bio: 'I test reducers',
          image: 'http_link_to_img',
        },
        followingStats: {
          following: 2,
          followers: 3,
        },
        isFollowing: 'true',
      },
    });

    expect(state.user.contentState).toBe(CONTENT_STATE_FETCHED);

    expect(state.user.fullname).toBe('Reducer Tester');
    expect(state.user.username).toBe('redtester');
    expect(state.user.about).toBe('I test reducers');
    expect(state.user.profilePic).toBe('http_link_to_img');

    expect(state.tabContent[TAB_FOLLOWING].count).toBe(2);
    expect(state.tabContent[TAB_FOLLOWERS].count).toBe(3);

    expect(state.user.isFollowing).toBe(true);

    done();
  });

  it('It should set the state to fetching when the article is fetching', (done) => {
    state = profileReducer(state, {
      type: PROFILE_ARTICLES_FETCHING,
    });

    expect(state.tabContent[TAB_ARTICLES].contentState).toBe(CONTENT_STATE_FETCHING);

    done();
  });

  it('It should set the state to failed if the article failed to fetch.', (done) => {
    state = profileReducer(state, {
      type: PROFILE_ARTICLES_FETCH_ERROR,
    });

    expect(state.tabContent[TAB_ARTICLES].contentState).toBe(CONTENT_STATE_FETCHING_FAILED);

    done();
  });

  it('It should set the state to fetched when he article is fetched', (done) => {
    state = profileReducer(state, {
      type: PROFILE_ARTICLES_FETCHED,
      data: {
        articles: [
          { title: 'I am an article' },
        ]
      }
    });

    expect(state.tabContent[TAB_ARTICLES].contentState).toBe(CONTENT_STATE_FETCHED);
    expect(state.tabContent[TAB_ARTICLES].articles.length).toBe(1);

    done();
  });

  describe('Test followers section', () => {
    it('It should have a state of default', (done) => {
      expect(state.tabContent[TAB_FOLLOWERS].contentState).toBe(CONTENT_STATE_DEFAULT);

      done();
    });

    it('It should set the state to fetching', (done) => {
      state = profileReducer(state, {
        type: PROFILE_FOLLOWERS_FETCHING
      });

      expect(state.tabContent[TAB_FOLLOWERS].contentState).toBe(CONTENT_STATE_FETCHING);

      done();
    });

    it('It should set the state to failed', (done) => {
      state = profileReducer(state, {
        type: PROFILE_FOLLOWERS_FETCH_ERROR
      });

      expect(state.tabContent[TAB_FOLLOWERS].contentState).toBe(CONTENT_STATE_FETCHING_FAILED);

      done();
    });

    it('It should set the state to fetched', (done) => {
      state = profileReducer(state, {
        type: PROFILE_FOLLOWERS_FETCHED,
        data: {
          followers: [
            { username: 'follower' }
          ]
        }
      });

      expect(state.tabContent[TAB_FOLLOWERS].contentState).toBe(CONTENT_STATE_FETCHED);
      expect(state.tabContent[TAB_FOLLOWERS].followers.length).toBe(1);

      done();
    });
  });

  describe('Test following section', () => {
    it('It should have a state of default', (done) => {
      expect(state.tabContent[TAB_FOLLOWING].contentState).toBe(CONTENT_STATE_DEFAULT);

      done();
    });

    it('It should have a state of fetching', (done) => {
      state = profileReducer(state, {
        type: PROFILE_FOLLOWING_FETCHING
      });

      expect(state.tabContent[TAB_FOLLOWING].contentState).toBe(CONTENT_STATE_FETCHING);

      done();
    });

    it('It should have a state of failed', (done) => {
      state = profileReducer(state, {
        type: PROFILE_FOLLOWING_FETCH_ERROR
      });

      expect(state.tabContent[TAB_FOLLOWING].contentState).toBe(CONTENT_STATE_FETCHING_FAILED);

      done();
    });

    it('It should have a state of fetched', (done) => {
      state = profileReducer(state, {
        type: PROFILE_FOLLOWING_FETCHED,
        data: {
          following: [
            { username: 'mentor' }
          ]
        }
      });

      expect(state.tabContent[TAB_FOLLOWING].contentState).toBe(CONTENT_STATE_FETCHED);
      expect(state.tabContent[TAB_FOLLOWING].following.length).toBe(1);

      done();
    });
  });

  describe('Test profile update', () => {
    it('The state should be default', (done) => {
      expect(state.editState).toBe(CONTENT_STATE_DEFAULT);

      done();
    });

    it('It should set state to updating', (done) => {
      state = profileReducer(state, {
        type: PROFILE_DETAILS_UPDATING,
      });

      expect(state.editState).toBe(CONTENT_STATE_UPDATING);

      done();
    });

    it('It should set state to update failed', (done) => {
      state = profileReducer(state, {
        type: PROFILE_DETAILS_UPDATE_ERROR
      });

      expect(state.editState).toBe(CONTENT_STATE_UPDATE_FAILED);

      done();
    });

    it('It should set state to updated', (done) => {
      state = profileReducer(state, {
        type: PROFILE_DETAILS_UPDATED,
        data: {
          username: 'abc',
          bio: 'zxcv',
          image: 'djhfgfgh.png'
        }
      });

      expect(state.editState).toBe(CONTENT_STATE_UPDATED);

      done();
    });

    it('It should set state back to default', (done) => {
      state = profileReducer(state, { type: PROFILE_RESET_EDIT_STATE });

      expect(state.editState).toBe(CONTENT_STATE_DEFAULT);

      done();
    });
  });

  describe('Test resetting the user profile', () => {
    it('It should reset the state', (done) => {
      state = profileReducer(state, { type: PROFILE_RESET });

      expect(state.user.fullname).toBe(null);
      expect(state.user.username).toBe(null);
      expect(state.user.about).toBe(null);
      expect(state.user.profilePic).toBe(null);
      expect(state.user.isFollowing).toBe(false);
      expect(state.user.contentState).toBe(CONTENT_STATE_FETCHING);

      expect(state.tabContent[TAB_ARTICLES].count).toBe(0);
      expect(state.tabContent[TAB_ARTICLES].articles.length).toBe(0);
      expect(state.tabContent[TAB_ARTICLES].contentState).toBe(CONTENT_STATE_DEFAULT);

      expect(state.tabContent[TAB_FOLLOWING].count).toBe(0);
      expect(state.tabContent[TAB_FOLLOWING].following.length).toBe(0);
      expect(state.tabContent[TAB_FOLLOWING].contentState).toBe(CONTENT_STATE_DEFAULT);

      expect(state.tabContent[TAB_FOLLOWERS].count).toBe(0);
      expect(state.tabContent[TAB_FOLLOWERS].followers.length).toBe(0);
      expect(state.tabContent[TAB_FOLLOWERS].contentState).toBe(CONTENT_STATE_DEFAULT);

      done();
    });
  });

  describe('Test feature to follow/unfollow a user', () => {
    it('It should set followActionWorking to true if following is in progress', (done) => {
      state = profileReducer(state, { type: FOLLOW_ACTION_FOLLOWING_IN_PROGRESS });

      expect(state.followActionWorking).toBe(true);

      done();
    });

    it('It should set followActionWorking to true if unfollowing is in progress', (done) => {
      state = profileReducer(state, { type: FOLLOW_ACTION_UNFOLLOWING_IN_PROGRESS });

      expect(state.followActionWorking).toBe(true);

      done();
    });

    it('It should set isFollowing to true and followActionWorking to false if use was followed successfully', (done) => {
      state = profileReducer(state, { type: FOLLOW_ACTION_FOLLOWED });

      expect(state.user.isFollowing).toBe(true);
      expect(state.followActionWorking).toBe(false);

      done();
    });

    it('It should set isFollowing to false and followActionWorking to false if user was unfollowed successfully', (done) => {
      state = profileReducer(state, { type: FOLLOW_ACTION_UNFOLLOWED });

      expect(state.user.isFollowing).toBe(false);
      expect(state.followActionWorking).toBe(false);

      done();
    });

    it('It should set followActionWorking to false if was unsuccessful to follow a user', (done) => {
      state = profileReducer(state, { type: FOLLOW_ACTION_FOLLOW_FAILED });

      expect(state.followActionWorking).toBe(false);

      done();
    });

    it('It should set followActionWorking to false if was unsuccessful to unfollow a user', (done) => {
      state = profileReducer(state, { type: FOLLOW_ACTION_UNFOLLOW_FAILED });

      expect(state.followActionWorking).toBe(false);

      done();
    });
  });
});

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
