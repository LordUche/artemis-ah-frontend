import { FETCH_TAGS, FETCH_TAGS_ERROR } from '../actionTypes';

export const initialState = {
  tagList: [],
  errors: {}
};

/**
 *
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const tagReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TAGS:
      return {
        ...state,
        tagList: payload
      };
    case FETCH_TAGS_ERROR:
      return {
        errors: payload
      };
    default:
      return state;
  }
};

export default tagReducer;
