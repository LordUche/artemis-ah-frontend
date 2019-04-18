import {
  CREATE_ARTICLE, CREATE_ARTICLE_ERROR, CLEAR_ARTICLE_ERROR, PUBLISHING_ARTICLE, GET_ARTICLES
} from '../actionTypes';

export const initialState = {
  articleData: {},
  articles: [],
  errors: {},
  isPublishing: false
};

/**
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        isPublishing: false,
        articleData: payload
      };
    case CREATE_ARTICLE_ERROR:
      return {
        ...state,
        isPublishing: false,
        errors: payload
      };
    case CLEAR_ARTICLE_ERROR:
      return {
        ...state,
        isPublishing: false,
        errors: {}
      };
    case PUBLISHING_ARTICLE:
      return {
        ...state,
        isPublishing: true
      };
    default:
      return state;
  }
};

export default articleReducer;
