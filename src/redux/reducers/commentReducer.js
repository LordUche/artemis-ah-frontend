import {
  GET_COMMENTS,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  COMMENT_LOADING,
  CLEAR_POSTED,
  LIKE_COMMENT_ERROR,
  TOGGLE_COMMENT_LIKE,
  EDIT_COMMENT,
  EDIT_COMMENT_ERROR,
  EDIT_LOADING,
  CLEAR_EDITED,
  GET_EDIT_COMMENT_HISTORY,
  GET_COMMENT_EDIT_HISTORY_LOADING
} from '../actionTypes';

export const initialState = {
  articleComments: [],
  errors: {},
  posted: false,
  loading: false,
  edited: false,
  editLoading: false,
  commentHistory: [],
  commentEditHistoryLoading: false
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
  let newArticleComment;
  if (type === EDIT_COMMENT) {
    const oldComments = state.articleComments;
    const editedCommentInStore = state.articleComments.find(obj => obj.id === payload.id);
    const index = state.articleComments.findIndex(obj => obj.id === payload.id);
    const updatedComment = { ...editedCommentInStore, ...payload };
    updatedComment.isEdited = true;
    updatedComment.backgroundColor = 'successfully-saved';
    oldComments[index] = updatedComment;
    newArticleComment = oldComments.filter(comment => comment.id);
  }

  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        articleComments: payload,
        errors: {}
      };
    case GET_EDIT_COMMENT_HISTORY:
      return {
        ...state,
        commentHistory: payload,
        commentEditHistoryLoading: false
      };
    case EDIT_COMMENT:
      return {
        ...state,
        articleComments: newArticleComment,
        editLoading: false,
        edited: true
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
    case EDIT_COMMENT_ERROR:
      return {
        ...state,
        editLoading: false
      };
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case EDIT_LOADING:
      return {
        ...state,
        editLoading: true
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
    case CLEAR_EDITED:
      return {
        ...state,
        edited: false
      };
    case GET_COMMENT_EDIT_HISTORY_LOADING:
      return {
        ...state,
        commentEditHistoryLoading: true
      };
    default:
      return state;
  }
};

export default commentReducer;
