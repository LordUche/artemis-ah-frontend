import { get, post } from 'axios';
import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED
} from '../actionTypes';
import BASE_URL from './index';

/**
 * @function getComments
 * @description Retrieves comments for a particular article
 * @param {string} slug
 * @returns {object} comments
 */
const getComments = async (slug) => {
  const request = await get(`${BASE_URL}/articles/${slug}/comments`);
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
const postComment = async (slug, { comment }) => {
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

export {
  getComments,
  postComment,
};
