import {
  PROFILE_USER_DETAILS_FETCHED,
  PROFILE_USER_DETAILS_FETCH_ERROR,
  PROFILE_ARTICLES_FETCHED,
  PROFILE_ARTICLES_FETCH_ERROR,
  PROFILE_FOLLOWERS_FETCHED,
  PROFILE_FOLLOWERS_FETCH_ERROR,
  PROFILE_FOLLOWING_FETCHED,
  PROFILE_FOLLOWING_FETCH_ERROR,
} from '../actionTypes';

const TAB_ARTICLES = 'tab.articles';
const TAB_FOLLOWING = 'tab.following';
const TAB_FOLLOWERS = 'tab.followers';

const CONTENT_STATE_FETCHED = 'content-state.fetched';
const CONTENT_STATE_FETCHING = 'content-state.fetching';
const CONTENT_STATE_FETCHING_FAILED = 'content-state.failed';

const initialState = {
  user: {
    fullname: null,
    username: null,
    about: null,
    profilePic: null,
    contentState: CONTENT_STATE_FETCHING,
  },
  tabContent: {
    [TAB_ARTICLES]: {
      count: 0,
      icon: 'fa-sticky-note',
      menuLabel: 'Articles',
      articles: [],
      contentState: CONTENT_STATE_FETCHING,
    },
    [TAB_FOLLOWING]: {
      count: 0,
      icon: 'fa-user',
      menuLabel: 'Following',
      following: [],
      contentState: CONTENT_STATE_FETCHING,
    },
    [TAB_FOLLOWERS]: {
      count: 0,
      icon: 'fa-user',
      menuLabel: 'Followers',
      followers: [],
      contentState: CONTENT_STATE_FETCHING,
    }
  },
};

export default (state = initialState, { type, data }) => {
  const newState = Object.assign({}, state);

  switch (type) {
    // User details.
    case PROFILE_USER_DETAILS_FETCHED:
      newState.user = {
        fullname: `${data.user.firstname} ${data.user.lastname}`,
        username: data.user.username,
        about: data.user.bio,
        profilePic: data.user.image,
        contentState: CONTENT_STATE_FETCHED,
      };
      return newState;
    case PROFILE_USER_DETAILS_FETCH_ERROR:
      newState.user.contentState = CONTENT_STATE_FETCHING_FAILED;
      return newState;

    // User articles.
    case PROFILE_ARTICLES_FETCHED:
      newState.tabContent[TAB_ARTICLES] = Object.assign(newState.tabContent[TAB_ARTICLES], {
        articles: data.articles,
        contentState: CONTENT_STATE_FETCHED,
      });
      return newState;
    case PROFILE_ARTICLES_FETCH_ERROR:
      newState.tabContent[TAB_ARTICLES] = Object.assign(newState.tabContent[TAB_ARTICLES], {
        contentState: CONTENT_STATE_FETCHING_FAILED,
      });
      return newState;

    // User followers
    case PROFILE_FOLLOWERS_FETCHED:
      newState.tabContent[TAB_FOLLOWERS] = Object.assign(newState.tabContent[TAB_FOLLOWERS], {
        followers: data.followers,
        contentState: CONTENT_STATE_FETCHED,
      });
      return newState;
    case PROFILE_FOLLOWERS_FETCH_ERROR:
      newState.tabContent[TAB_FOLLOWERS] = Object.assign(newState.tabContent[TAB_FOLLOWERS], {
        contentState: CONTENT_STATE_FETCHING_FAILED,
      });
      return newState;

    // User following.
    case PROFILE_FOLLOWING_FETCHED:
      newState.tabContent[TAB_FOLLOWING] = Object.assign(newState.tabContent[TAB_FOLLOWING], {
        following: data.following,
        contentState: CONTENT_STATE_FETCHED,
      });
      return newState;
    case PROFILE_FOLLOWING_FETCH_ERROR:
      newState.tabContent[TAB_FOLLOWING] = Object.assign(newState.tabContent[TAB_FOLLOWING], {
        contentState: CONTENT_STATE_FETCHING_FAILED,
      });
      return newState;

    default:
      return state;
  }
};
