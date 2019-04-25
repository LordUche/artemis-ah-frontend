import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED
} from '../actionTypes';


const initialState = {
  articleComments: [],
  errors: {},
  posted: false,
  loading: false
};

/**
 * @param {*} state
 * @returns {object} comment reducer
 */
const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        articleComments: payload
      };
    case POST_COMMENT:
      return {
        ...state,
        posted: true,
        loading: false
      };
    case POST_COMMENT_ERROR:
      return {
        ...state,
        errors: payload.errors,
        loading: false
      };
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_POSTED:
      return {
        ...state,
        posted: false
      };
    default:
      return state;
  }
};

export default commentReducer;
