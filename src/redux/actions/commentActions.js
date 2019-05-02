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
  EDIT_COMMENT,
  EDIT_COMMENT_ERROR,
  EDIT_LOADING,
  CLEAR_EDITED,
  GET_EDIT_COMMENT_HISTORY,
  GET_COMMENT_EDIT_HISTORY_LOADING
} from '../actionTypes';

import BASE_URL from './index';

/**
 * @function getComments
 * @description Retrieves comments for a particular article
 * @param {string} slug
 * @returns {object} comments
 */
export const getComments = async (slug) => {
  const request = await get(`${BASE_URL}/articles/${slug}/comments`);
  const { comments } = request.data;
  return {
    type: GET_COMMENTS,
    payload: comments
  };
};

/**
 * @function getCommentEditHistory
 * @description Retrieves comments for a particular article
 * @param {string} slug
 * @param {number} commentId
 * @param {string} token
 * @returns {object} comment hstory
 */
export const getCommentEditHistory = async (slug, commentId, token) => {
  const request = await get(
    `${BASE_URL}/articles/${slug}/comment/${commentId}/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const { history } = request.data;
  return {
    type: GET_EDIT_COMMENT_HISTORY,
    payload: history
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
    const request = await post(
      `${BASE_URL}/articles/${slug}/comment`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authorsHavenToken')
            || sessionStorage.getItem('authorsHavenToken')}`
        }
      }
    );
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
 * @returns {boolean} loading
 */
export const editHistoryCommentLoading = () => ({ type: GET_COMMENT_EDIT_HISTORY_LOADING });

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
