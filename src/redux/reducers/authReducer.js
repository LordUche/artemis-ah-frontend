import {
  LOGIN_USER, LOGIN_ERROR, AUTH_LOADING, CLEAR_AUTH_ERROR
} from '../actionTypes';

/**
 * @description function to return initial state
 * @param {object} localStorage the local storage to query (to be mocked for testing)
 * @returns {object} the initial state
 */
export const initialState = localStorage => ({
  isLoggedIn: !!localStorage.authorsHavenToken,
  token: localStorage.authorsHavenToken || '',
  errorMessages: {},
  loading: false
});

/**
 * @description reducer for auth operations
 * @param {object} state the current state
 * @param {object} action the action dispatched
 * @returns {object} the new state
 */
const authReducer = (state = initialState(localStorage), { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        token: payload.token,
        isLoggedIn: true,
        loading: false
      };
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        errorMessages: payload.message ? { errors: { general: payload.message } } : payload,
        loading: false
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        errorMessages: []
      };
    default:
      return state;
  }
};

export default authReducer;
