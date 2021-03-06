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
  GETTING_ARTICLE,
  RATING_ARTICLE,
  RATED_ARTICLE,
  RATING_ARTICLE_ERROR,
  ARTICLE_BOOKMARK_ADDED,
  ARTICLE_BOOKMARK_ADD_ERROR,
  ARTICLE_BOOKMARK_REMOVED,
  ARTICLE_BOOKMARK_REMOVE_ERROR,
  DELETED_BOOKMARK,
  BOOKMARK_LOADING,
  ERROR_DELETING_BOOKMARKS,
  GOT_BOOKMARKS,
  ERROR_GETTING_BOOKMARKS,
  ARTICLE_CLAP,
  ARTICLE_CLAP_ERROR,
  HISTORY_LOADING,
  GOT_HISTORY,
  ERROR_GETTING_HISTORY
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
 * @method filterArticles
 * @description Method to get all articles
 * @param {string} keyword Filter Parameter
 * @returns {object} Fetched articles
 */
const filterArticles = async (keyword) => {
  try {
    const response = await get(`${BASE_URL}/filter?tag=${keyword}`);
    const { articles } = response.data;
    const total = articles.length;
    const limit = 20;

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
 * @param {*} articleSlug The slug of the article to bookmark
 * @param {*} authToken The user's JWT authentication token.
 * @returns {object} Returns the redux action object.
 */
const bookmarkArticleAction = async (articleSlug, authToken) => {
  try {
    const response = await post(`articles/${articleSlug}/bookmark`, null, {
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    notifyUser(toast(response.data.message));

    return {
      type: ARTICLE_BOOKMARK_ADDED,
      payload: response.data
    };
  } catch (error) {
    return {
      type: ARTICLE_BOOKMARK_ADD_ERROR
    };
  }
};

/**
 * @param {*} articleSlug The slug of the article to remove from bookmark
 * @param {*} authToken The user's JWT authentication token.
 * @returns {object} Returns the redux action object.
 */
const removeBookmarkAction = async (articleSlug, authToken) => {
  try {
    const response = await axiosDelete(`articles/${articleSlug}/bookmark`, {
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    notifyUser(toast(response.data.message));

    return {
      type: ARTICLE_BOOKMARK_REMOVED
    };
  } catch (error) {
    return {
      type: ARTICLE_BOOKMARK_REMOVE_ERROR
    };
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
    notifyUser(toast('Update Failed'));
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
    notifyUser(toast('Delete Failed'));
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
    const articleRequest = await get(`${BASE_URL}/articles/${articleSlug}`, requestOptions);
    const gottenArticle = articleRequest.data;

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
 * @method rateArticleAction
 * @param {string} slug - The slug of the article to be rated
 * @param {number} rating - The value to rate the article (between 1 - 5)
 * @description - Method to dispatch rate article actions
 * @returns {object} - The new rated article action object
 */
const rateArticleAction = async (slug, rating) => {
  const token = localStorage.getItem('authorsHavenToken') || sessionStorage.getItem('authorsHavenToken');
  try {
    const request = await post(
      `${BASE_URL}/articles/${slug}/ratings`,
      { rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return {
      type: RATED_ARTICLE,
      payload: request.data
    };
  } catch (error) {
    return {
      type: RATING_ARTICLE_ERROR,
      payload: error
    };
  }
};

/**
 * @description function for displaying rating state
 * @returns {object} action
 */
const ratingArticleAction = () => ({ type: RATING_ARTICLE });

/**
 * @description function for displaying loading state
 * @returns {object} action
 */
const gettingArticleAction = () => ({ type: GETTING_ARTICLE });

/**
 * @method getBookmarksAction
 * @description Method to get all bookmarked articles
 * @param {string} token user's token
 * @returns {object} action
 */
const getBookmarksAction = async (token) => {
  try {
    const response = await get(`${BASE_URL}/bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      type: GOT_BOOKMARKS,
      payload: response.data.userBookmarks || []
    };
  } catch (error) {
    return {
      type: ERROR_GETTING_BOOKMARKS,
      payload: error.response.data
    };
  }
};

/**
 * @method deleteBookmarksAction
 * @description Method to unbookmark an article
 * @param {string} article the article to be removed from bookmarks
 * @param {string} token the user's token
 * @returns {object} action
 */
const deleteBookmarkAction = async (article, token) => {
  try {
    const response = await axiosDelete(`${BASE_URL}/articles/${article.slug}/bookmark`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      type: DELETED_BOOKMARK,
      payload: article || response.data
    };
  } catch (error) {
    return {
      type: ERROR_DELETING_BOOKMARKS,
      payload: error.response.data || { message: 'Server Error' }
    };
  }
};

/**
 * @method bookmarkLoading
 * @description Method to trigger loading state due to bookmark actions
 * @returns {object} action
 */
const bookmarkLoadingAction = () => ({ type: BOOKMARK_LOADING });

/**
 * @method createArticleAction
 * @description - Method to dispatch article clap actions
 * @param {object} slug - The slug for article
 * @param {string} token - The user's token
 * @returns {object} - The create article action object
 */
const articleClapAction = async (slug, token) => {
  try {
    const request = await post(`${BASE_URL}/articles/${slug}/clapToggle`, {}, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    const articleClap = request.data;
    return {
      type: ARTICLE_CLAP,
      payload: articleClap
    };
  } catch (error) {
    const errorResponse = { status: 'Can not like an article' };
    const obj = {
      type: ARTICLE_CLAP_ERROR,
      payload: error.response.data ? error.response.data.errors : errorResponse
    };
    return obj;
  }
};

/**
 * @method historyLoading
 * @description Method to trigger loading state when fetching history
 * @returns {object} action
 */
const historyLoadingAction = () => ({ type: HISTORY_LOADING });

/**
 * @method getHistoryAction
 * @description Method to get user's history
 * @param {string} token user's token
 * @returns {object} action
 */
const getHistoryAction = async (token) => {
  try {
    const response = await get(`${BASE_URL}/users/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      type: GOT_HISTORY,
      payload: response.data.history || []
    };
  } catch (error) {
    return {
      type: ERROR_GETTING_HISTORY,
      payload: error.response.data
    };
  }
};

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
  editArticle,
  rateArticleAction,
  ratingArticleAction,
  bookmarkArticleAction,
  removeBookmarkAction,
  getBookmarksAction,
  deleteBookmarkAction,
  bookmarkLoadingAction,
  filterArticles,
  articleClapAction,
  historyLoadingAction,
  getHistoryAction
};
