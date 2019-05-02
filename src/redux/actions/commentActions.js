import 'babel-polyfill';
import { get, post, patch } from 'axios';
import { toast } from 'react-toastify';
import notifyUser from '../../utils/Toast';
import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED,
  LIKE_COMMENT_ERROR,
  TOGGLE_COMMENT_LIKE,
  TOGGLE_COMMENT_LIKE_SUCCESS,
  EDIT_COMMENT,
  EDIT_COMMENT_ERROR,
  EDIT_LOADING,
  CLEAR_EDITED
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
 * @param {string} highlighted
 * @returns {object} comments
 */
export const postComment = async (slug, { comment }, highlighted = 'N/A') => {
  const commentUrl = highlighted === 'N/A' ? 'comment' : 'highlight';
  const commentBody = highlighted === 'N/A' ? { comment } : Object.assign({ comment }, { highlighted, index: 0 });

  try {
    const request = await post(`${BASE_URL}/articles/${slug}/${commentUrl}`, commentBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorsHavenToken')
          || sessionStorage.getItem('authorsHavenToken')}`
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
 * @function editComment
 * @description Edits a comment to a single article
 * @param {string} slug
 * @param {string} comment
 * @param {number} commentId
 * @returns {object} comments
 */
export const editComment = async (slug, comment, commentId) => {
  try {
    const request = await patch(
      `${BASE_URL}/articles/${slug}/comment/${commentId}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorsHavenToken')
            || sessionStorage.getItem('authorsHavenToken')}`
        }
      }
    );
    const editedComment = request.data.userComment;
    toast(notifyUser(request.data.message));
    return {
      type: EDIT_COMMENT,
      payload: editedComment
    };
  } catch (err) {
    toast(notifyUser('Update failed'));
    return {
      type: EDIT_COMMENT_ERROR
    };
  }
};

/**
 * @returns {boolean} loadIng
 */
export const editCommentLoading = () => ({ type: EDIT_LOADING });

/**
 * @returns {boolean} loadIng
 */
export const clearEditComment = () => ({ type: CLEAR_EDITED });

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
