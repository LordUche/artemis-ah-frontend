import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_ERROR,
  CLEAR_ARTICLE_ERROR,
  PUBLISHING_ARTICLE,
  SAVE_EDITED_ARTICLE,
  EDIT_ARTICLE,
  OPEN_DELETE_CONFIRMATION_MODAL,
  CLOSE_DELETE_CONFIRMATION_MODAL
} from '../actionTypes';

export const initialState = {
  articleData: {},
  errors: {},
  isPublishing: false,
  articleCardData: JSON.parse(localStorage.getItem('cardData')) || {},
  confirmationModal: false,
  updatedArticle: {}
};

/**
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
    case EDIT_ARTICLE:
      return {
        ...state,
        articleCardData: payload
      };
    case SAVE_EDITED_ARTICLE:
      return {
        ...state,
        isPublishing: false,
        updatedArticle: payload
      };
    case OPEN_DELETE_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModal: true
      };
    case CLOSE_DELETE_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModal: false
      };
    default:
      return state;
  }
};

export default articleReducer;
