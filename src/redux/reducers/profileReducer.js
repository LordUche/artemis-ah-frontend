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
} from '../actionTypes';
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
  CONTENT_STATE_UPDATE_FAILED
} from '../../constants/profileConstants';

/**
 * @returns {object} Returns the initial state of the profile page.
 */
export const getInitialState = () => ({
  user: {
    fullname: null,
    username: null,
    about: null,
    profilePic: null,
    isFollowing: false,
    contentState: CONTENT_STATE_FETCHING
  },
  tabContent: {
    [TAB_ARTICLES]: {
      count: 0,
      icon: 'fa-sticky-note',
      menuLabel: 'Articles',
      articles: [],
      contentState: CONTENT_STATE_DEFAULT
    },
    [TAB_FOLLOWING]: {
      count: 0,
      icon: 'fa-user',
      menuLabel: 'Following',
      following: [],
      contentState: CONTENT_STATE_DEFAULT
    },
    [TAB_FOLLOWERS]: {
      count: 0,
      icon: 'fa-user',
      menuLabel: 'Followers',
      followers: [],
      contentState: CONTENT_STATE_DEFAULT
    }
  },
  editState: CONTENT_STATE_DEFAULT,
  followActionWorking: false,
});

export default (state = getInitialState(), { type, data }) => {
  const newState = Object.assign({}, state);

  switch (type) {
    // User details.
    case PROFILE_USER_DETAILS_FETCHED:
      newState.user = {
        fullname: `${data.user.firstname} ${data.user.lastname}`,
        username: data.user.username,
        about: data.user.bio,
        profilePic: data.user.image,
        isFollowing: data.isFollowing === 'true',
        contentState: CONTENT_STATE_FETCHED
      };

      newState.tabContent[TAB_ARTICLES].count = data.totalArticles;
      newState.tabContent[TAB_FOLLOWING].count = data.followingStats.following;
      newState.tabContent[TAB_FOLLOWERS].count = data.followingStats.followers;

      return newState;
    case PROFILE_USER_DETAILS_FETCH_ERROR:
      newState.user.contentState = CONTENT_STATE_FETCHING_FAILED;
      return newState;

    // User articles.
    case PROFILE_ARTICLES_FETCHING:
      newState.tabContent[TAB_ARTICLES] = Object.assign(newState.tabContent[TAB_ARTICLES], {
        contentState: CONTENT_STATE_FETCHING
      });
      return newState;
    case PROFILE_ARTICLES_FETCHED:
      newState.tabContent[TAB_ARTICLES] = Object.assign(newState.tabContent[TAB_ARTICLES], {
        articles: data.articles,
        totalArticles: data.total,
        limit: data.limit,
        contentState: CONTENT_STATE_FETCHED
      });
      return newState;
    case DELETE_ARTICLE:
      newState.tabContent[TAB_ARTICLES].articles = newState.tabContent[
        TAB_ARTICLES
      ].articles.filter(article => article.slug !== data.slug);
      return newState;
    case SAVE_EDITED_ARTICLE:
      localStorage.setItem('reload', true);
      return newState;
    case PROFILE_ARTICLES_FETCH_ERROR:
      newState.tabContent[TAB_ARTICLES] = Object.assign(newState.tabContent[TAB_ARTICLES], {
        contentState: CONTENT_STATE_FETCHING_FAILED
      });
      return newState;

    // User followers
    case PROFILE_FOLLOWERS_FETCHING:
      newState.tabContent[TAB_FOLLOWERS] = Object.assign(newState.tabContent[TAB_FOLLOWERS], {
        contentState: CONTENT_STATE_FETCHING
      });
      return newState;
    case PROFILE_FOLLOWERS_FETCHED:
      newState.tabContent[TAB_FOLLOWERS] = Object.assign(newState.tabContent[TAB_FOLLOWERS], {
        followers: data.followers,
        contentState: CONTENT_STATE_FETCHED
      });
      return newState;
    case PROFILE_FOLLOWERS_FETCH_ERROR:
      newState.tabContent[TAB_FOLLOWERS] = Object.assign(newState.tabContent[TAB_FOLLOWERS], {
        contentState: CONTENT_STATE_FETCHING_FAILED
      });
      return newState;

    // User following.
    case PROFILE_FOLLOWING_FETCHING:
      newState.tabContent[TAB_FOLLOWING] = Object.assign(newState.tabContent[TAB_FOLLOWING], {
        contentState: CONTENT_STATE_FETCHING
      });
      return newState;
    case PROFILE_FOLLOWING_FETCHED:
      newState.tabContent[TAB_FOLLOWING] = Object.assign(newState.tabContent[TAB_FOLLOWING], {
        following: data.following,
        contentState: CONTENT_STATE_FETCHED
      });
      return newState;
    case PROFILE_FOLLOWING_FETCH_ERROR:
      newState.tabContent[TAB_FOLLOWING] = Object.assign(newState.tabContent[TAB_FOLLOWING], {
        contentState: CONTENT_STATE_FETCHING_FAILED
      });
      return newState;

    // User profile update
    case PROFILE_DETAILS_UPDATING:
      newState.editState = CONTENT_STATE_UPDATING;
      return newState;
    case PROFILE_DETAILS_UPDATED:
      newState.editState = CONTENT_STATE_UPDATED;
      return newState;
    case PROFILE_DETAILS_UPDATE_ERROR:
      newState.editState = CONTENT_STATE_UPDATE_FAILED;
      return newState;

    // User profile follow/unfollow action
    case FOLLOW_ACTION_FOLLOWING_IN_PROGRESS:
    case FOLLOW_ACTION_UNFOLLOWING_IN_PROGRESS:
      newState.followActionWorking = true;
      return newState;
    case FOLLOW_ACTION_FOLLOWED:
      newState.user.isFollowing = true;
      newState.followActionWorking = false;
      newState.tabContent[TAB_FOLLOWERS].count += 1;
      return newState;
    case FOLLOW_ACTION_UNFOLLOWED:
      newState.user.isFollowing = false;
      newState.followActionWorking = false;
      newState.tabContent[TAB_FOLLOWERS].count -= 1;
      return newState;
    case FOLLOW_ACTION_FOLLOW_FAILED:
    case FOLLOW_ACTION_UNFOLLOW_FAILED:
      newState.followActionWorking = false;
      return newState;

    // User profile edit state
    case PROFILE_RESET_EDIT_STATE:
      newState.editState = CONTENT_STATE_DEFAULT;
      return newState;

    // Reset user profile.
    case PROFILE_RESET:
      return getInitialState();

    default:
      return state;
  }
};
