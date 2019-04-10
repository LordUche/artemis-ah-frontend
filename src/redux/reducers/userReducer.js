import { LOGIN_USER } from '../actionTypes';

/**
 * @description function to return initial state
 * @param {object} localStorage the local storage to query (to be mocked for testing)
 * @returns {object} the initial state
 */
export const initialState = localStorage => ({
  username: localStorage.authorsHavenUsername || '',
  email: localStorage.authorsHavenEmail || '',
  bio: localStorage.authorsHavenBio || '',
  image: localStorage.authorsHavenImage || ''
});

/**
 * @description reducer for user detail operations
 * @param {object} state the current state
 * @param {object} action the action dispatched
 * @returns {object} the new state
 */
const userReducer = (state = initialState(localStorage), { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        username: payload.username,
        email: payload.email,
        bio: payload.bio,
        image: payload.image
      };
    default:
      return state;
  }
};

export default userReducer;
