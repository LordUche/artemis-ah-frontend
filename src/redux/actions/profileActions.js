import { get } from 'axios';
import { BASE_URL } from './index';
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

/**
 * @param {string} username Username of the user.
 * @param {string} token Authorization token.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserDetails = (username, token, dispatch) => get(`profiles/${username}`, {
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${token}`,
  }
})
  .then(response => response.data)
  .then((data) => {
    dispatch({
      type: PROFILE_USER_DETAILS_FETCHED,
      data,
    });
  })
  .catch(() => {
    dispatch({ type: PROFILE_USER_DETAILS_FETCH_ERROR });
  });

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch.
 */
export const fetchUserArticles = (username, dispatch) => get('articles', {
  baseURL: BASE_URL,
  params: {
    author: username,
  },
})
  .then(response => response.data)
  .then((data) => {
    dispatch({
      type: PROFILE_ARTICLES_FETCHED,
      data,
    });
  })
  .catch(() => {
    dispatch({ type: PROFILE_ARTICLES_FETCH_ERROR });
  });

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserFollowers = (username, dispatch) => get(`profiles/${username}/followers`, {
  baseURL: BASE_URL,
})
  .then(response => response.data)
  .then((data) => {
    dispatch({
      type: PROFILE_FOLLOWERS_FETCHED,
      data,
    });
  })
  .catch(() => {
    dispatch({ type: PROFILE_FOLLOWERS_FETCH_ERROR });
  });

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserFollowing = (username, dispatch) => get(`profiles/${username}/following`, {
  baseURL: BASE_URL,
})
  .then(response => response.data)
  .then((data) => {
    dispatch({
      type: PROFILE_FOLLOWING_FETCHED,
      data,
    });
  })
  .catch(() => {
    dispatch({ type: PROFILE_FOLLOWING_FETCH_ERROR });
  });
