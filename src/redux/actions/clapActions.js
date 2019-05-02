import 'babel-polyfill';
import { post } from 'axios';
// import { toast } from 'react-toastify';
import BASE_URL from './index';
// import notifyUser from '../../utils/Toast';


/**
 * @method createArticleAction
 * @description - Method to dispatch article clap actions
 * @param {object} slug - The slug for article
 * @returns {object} - The create article action object
 */
export default async (slug) => {
  try {
    const request = await post(`${BASE_URL}/articles/${slug}/clapToggle`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorsHavenToken')
          || sessionStorage.getItem('authorsHavenToken')}`
      }
    });

    const articleClap = request.data;

    return {
      type: 'ARTICLE_CLAP',
      payload: articleClap
    };
  } catch (error) {
    const errorResponse = { status: '5XX' };
    const obj = {
      type: 'ARTICLE_CLAP_ERROR',
      payload: error.response.data ? error.response.data.errors : errorResponse
    };
    return obj;
  }
};
