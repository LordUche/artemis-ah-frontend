import {
  LOGIN_USER, SIGN_UP, PROFILE_DETAILS_UPDATED, RESET_NEW_USER
} from '../actionTypes';

/**
 * @description function to return initial state
 * @param {object} localStorage the local storage to query (to be mocked for testing)
 * @param {object} sessionStorage the session storage to query (to be mocked for testing)
 * @returns {object} the initial state
 */
export const initialState = (localStorage, sessionStorage) => ({
  username: localStorage.authorsHavenUsername || sessionStorage.authorsHavenUsername || '',
  email: localStorage.authorsHavenEmail || sessionStorage.authorsHavenEmail || '',
  bio: localStorage.authorsHavenBio || sessionStorage.authorsHavenBio || '',
  image: localStorage.authorsHavenImage || sessionStorage.authorsHavenImage || '',
  newUser: localStorage.authorsHavenNewUser || sessionStorage.authorsHavenNewUser || false
});

/**
 * @description reducer for user detail operations
 * @param {object} state the current state
 * @param {object} action the action dispatched
 * @returns {object} the new state
 */
const userReducer = (state = initialState(localStorage, sessionStorage),
  { type, payload, data }) => {
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        email: payload.email
      };
    case LOGIN_USER:
      return {
        ...state,
        username: payload.username,
        email: payload.email,
        bio: payload.bio,
        image: payload.image,
        newUser: payload.newUser || false
      };
    case RESET_NEW_USER:
      delete localStorage.authorsHavenNewUser;
      delete sessionStorage.authorsHavenNewUser;
      return {
        ...state,
        newUser: false
      };
    case PROFILE_DETAILS_UPDATED:
      return {
        ...state,
        image: data.image,
        username: data.username,
        bio: data.bio
      };
    default:
      return state;
  }
};

export default userReducer;
