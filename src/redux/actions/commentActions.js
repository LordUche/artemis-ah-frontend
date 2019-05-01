import 'babel-polyfill';
import { get, post } from 'axios';
import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED,
  LIKE_COMMENT_ERROR,
  TOGGLE_COMMENT_LIKE,
  TOGGLE_COMMENT_LIKE_SUCCESS
} from '../actionTypes';

import BASE_URL from './index';

/**
 * @function getComments
 * @description Retrieves comments for a particular article
 * @param {string} slug
 * @param {string} token
 * @returns {object} comments
 */
export const getComments = async (slug, token) => {
  const requestOptions = {};
  if (token) {
    requestOptions.headers = {
      Authorization: `Bearer ${token}`
    };
  }
  const request = await get(`${BASE_URL}/articles/${slug}/comments`, requestOptions);
  const { comments } = request.data;
  return {
    type: GET_COMMENTS,
    payload: comments
  };
};

/**
 * @function postComment
 * @description Posts a comment to a particular article
 * @param {string} slug
 * @param {string} comment
 * @returns {object} comments
 */
export const postComment = async (slug, { comment }) => {
  try {
    const request = await post(`${BASE_URL}/articles/${slug}/comment`, { comment }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorsHavenToken') || sessionStorage.getItem('authorsHavenToken')}`
      }
    });
    const postedComment = request.data.userComment;

    return {
      type: POST_COMMENT,
      payload: postedComment
    };
  } catch (error) {
    return {
      type: POST_COMMENT_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @returns {boolean} loadIng
 */
export const loadingComment = () => ({ type: COMMENT_LOADING });

/**
 * @returns {boolean} loadIng
 */
export const clearPosted = () => ({ type: CLEAR_POSTED });

/**
 * @function postToggleCommentLike
 * @description Makes Api call to Like/Unlike comment
 * @param {string} slug - article slug
 * @param {number} commentId - the comment's id
 * @param {string} token - the user's token
 * @returns {object} comments
 */
export const postToggleCommentLikeAction = async (slug, commentId, token) => {
  try {
    const request = await post(`${BASE_URL}/articles/${slug}/comments/${commentId}/like`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      type: TOGGLE_COMMENT_LIKE_SUCCESS,
      payload: request.data.message
    };
  } catch (err) {
    return {
      type: LIKE_COMMENT_ERROR,
      payload: {
        id: commentId
      }
    };
  }
};

/**
 * @function toggleCommentLike
 * @description Likes/Unlikes comment in store
 * @param {number} commentId - the comment's id
 * @returns {object} comments
 */
export const toggleCommentLikeAction = commentId => ({
  type: TOGGLE_COMMENT_LIKE,
  payload: {
    id: commentId
  }
});
