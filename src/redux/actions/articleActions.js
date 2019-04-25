import 'babel-polyfill';
import {
  get, post, patch, delete as axiosDelete
} from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from './index';
import {
  FETCH_TAGS,
  FETCH_TAGS_ERROR,
  CREATE_ARTICLE,
  CREATE_ARTICLE_ERROR,
  CLEAR_ARTICLE_ERROR,
  PUBLISHING_ARTICLE,
  EDIT_ARTICLE,
  SAVE_EDITED_ARTICLE,
  OPEN_DELETE_CONFIRMATION_MODAL,
  CLOSE_DELETE_CONFIRMATION_MODAL,
  DELETE_ARTICLE,
  FETCH_DELETE_ERROR,
  GET_ARTICLES,
  GET_ARTICLES_ERROR,
  GOT_ARTICLE,
  ERROR_GETTING_ARTICLE,
  GETTING_ARTICLE
} from '../actionTypes';
import notifyUser from '../../utils/Toast';

/**
 * @method GetArticles
 * @description Method to get all articles
 * @param {number} pageNo Page number
 * @returns {object} Fetched articles
 */
const getAllArticles = async (pageNo = 1) => {
  try {
    const response = await get(`${BASE_URL}/articles?page=${pageNo}`);
    const { articles, total, limit } = response.data;

    return {
      type: GET_ARTICLES,
      payload: { articles, limit, total }
    };
  } catch (error) {
    return {
      type: GET_ARTICLES_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @returns {string} loading
 */

/**
 * @method fetchTags
 * @description - Method to dispatch fetch tags actions
 * @returns {object} - The fetch tags action object
 */
const fetchTagsAction = async () => {
  try {
    const response = await get(`${BASE_URL}/articles/tags`);
    const { tags } = response.data;
    return {
      type: FETCH_TAGS,
      payload: tags
    };
  } catch (error) {
    return {
      type: FETCH_TAGS_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @method createArticleAction
 * @description - Method to dispatch create article actions
 * @param {object} articleDetails - The form details stored in state
 * @returns {object} - The create article action object
 */
const createArticleAction = async (articleDetails) => {
  try {
    const request = await post(`${BASE_URL}/articles`, articleDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorsHavenToken')
          || sessionStorage.getItem('authorsHavenToken')}`
      }
    });

    const createdArticle = request.data;

    return {
      type: CREATE_ARTICLE,
      payload: createdArticle
    };
  } catch (error) {
    const errorResponse = { status: '5XX' };
    const obj = {
      type: CREATE_ARTICLE_ERROR,
      payload: error.response.data ? error.response.data.errors : errorResponse
    };
    return obj;
  }
};

/**
 * @description function for clearing create article errors
 * @returns {object} action
 */
const clearErrorsAction = () => ({ type: CLEAR_ARTICLE_ERROR });

/**
 * @description function for displaying publishing state
 * @returns {object} action
 */
const publishingArticleAction = () => ({ type: PUBLISHING_ARTICLE });

/**
 * @description function for confirming article delete (this opens a modal)
 * @returns {object} action
 */
const confirmArticleDeleteAction = () => ({ type: OPEN_DELETE_CONFIRMATION_MODAL });

/**
 * @description function for closing the confirm article deletion modal
 * @returns {object} action
 */
const closeArticleDeleteModalAction = () => ({ type: CLOSE_DELETE_CONFIRMATION_MODAL });

/**
 * @description Edit an article
 * @param {object} articleCardData
 * @returns {object} Action object for redux
 */
const editArticle = articleCardData => ({
  type: EDIT_ARTICLE,
  payload: articleCardData
});

/**
 * @description Saved edited article
 * @param {object} payload
 * @returns {object} Action object for redux
 */
const saveEditedArticleAction = async ({
  title, body, description, cover, slug
}) => {
  const token = localStorage.getItem('authorsHavenToken') || sessionStorage.getItem('authorsHavenToken');
  try {
    const response = await patch(
      `${BASE_URL}/articles/${slug}`,
      {
        title,
        body,
        description,
        cover
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    localStorage.removeItem('cardData');
    const { article, message } = response.data;
    localStorage.setItem('articleEditMessage', message);
    const payload = article;
    return {
      type: SAVE_EDITED_ARTICLE,
      payload,
      data: { article }
    };
  } catch (error) {
    return {
      type: FETCH_DELETE_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @description delete article
 * @param {string} slug
 * @returns {object} Action object for redux
 */
const deleteArticleAction = async (slug) => {
  const token = localStorage.getItem('authorsHavenToken') || sessionStorage.getItem('authorsHavenToken');
  try {
    const response = await axiosDelete(`${BASE_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { message } = response.data;
    notifyUser(toast(message));
    localStorage.removeItem('deleteSlug');
    return {
      type: DELETE_ARTICLE,
      data: { slug }
    };
  } catch (error) {
    return {
      type: FETCH_DELETE_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @method getArticleAction
 * @param {string} articleSlug - The slug of the article to get
 * @param {string} token - The user's token
 * @description - Method to dispatch get article actions
 * @returns {object} - The got article action object
 */
const getArticleAction = async (articleSlug, token) => {
  const requestOptions = {};
  if (token) {
    requestOptions.headers = {
      Authorization: `Bearer ${token}`
    };
  }
  try {
    const request = await get(`${BASE_URL}/articles/${articleSlug}`, requestOptions);
    const gottenArticle = request.data;

    return {
      type: GOT_ARTICLE,
      payload: gottenArticle
    };
  } catch (error) {
    const networkErrorResponse = { message: "Can't get Article right now, please try again later" };
    return {
      type: ERROR_GETTING_ARTICLE,
      payload: error.response ? error.response.data : networkErrorResponse
    };
  }
};

/**
 * @description function for displaying loading state
 * @returns {object} action
 */
const gettingArticleAction = () => ({ type: GETTING_ARTICLE });

export {
  fetchTagsAction,
  createArticleAction,
  clearErrorsAction,
  publishingArticleAction,
  getAllArticles,
  getArticleAction,
  gettingArticleAction,
  deleteArticleAction,
  saveEditedArticleAction,
  confirmArticleDeleteAction,
  closeArticleDeleteModalAction,
  editArticle
};
