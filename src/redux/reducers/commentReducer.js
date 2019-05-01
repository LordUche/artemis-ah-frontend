import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED,
  LIKE_COMMENT_ERROR,
  TOGGLE_COMMENT_LIKE,
} from '../actionTypes';


export const initialState = {
  articleComments: [],
  errors: {},
  posted: false,
  loading: false
};

/**
 * @param {*} state
 * @returns {object} comment reducer
 */
export const commentReducer = (state = initialState, { type, payload }) => {
  let chosenComment, remainingComments;
  if (type === TOGGLE_COMMENT_LIKE || type === LIKE_COMMENT_ERROR) {
    const { articleComments } = state;
    const { id } = payload;
    chosenComment = articleComments.find(c => c.id === id);
    remainingComments = articleComments.filter(c => c.id !== id);
  }
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        articleComments: payload,
        errors: {}
      };
    case POST_COMMENT:
      return {
        ...state,
        posted: true,
        loading: false,
        errors: {}
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
        loading: true,
        errors: {}
      };
    case CLEAR_POSTED:
      return {
        ...state,
        posted: false,
        errors: {}
      };
    case TOGGLE_COMMENT_LIKE:
      chosenComment.hasLiked = !chosenComment.hasLiked;
      chosenComment.totalLikes = chosenComment.hasLiked
        ? chosenComment.totalLikes + 1 : chosenComment.totalLikes - 1;
      return {
        ...state,
        articleComments: [...remainingComments, chosenComment].sort((a, b) => b.id - a.id)
      };
    case LIKE_COMMENT_ERROR:
      chosenComment.hasLiked = !chosenComment.hasLiked;
      chosenComment.totalLikes = chosenComment.hasLiked
        ? chosenComment.totalLikes + 1 : chosenComment.totalLikes - 1;
      return {
        ...state,
        articleComments: [...remainingComments, chosenComment].sort((a, b) => b.id - a.id),
        errors: { message: 'Cannot perform action right now, please check your connection and try again later' }
      };
    default:
      return state;
  }
};

export default commentReducer;
