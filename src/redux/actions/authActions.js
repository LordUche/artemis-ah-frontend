import 'babel-polyfill';
import { post } from 'axios';
import BASE_URL from './index';
import {
  LOGIN_ERROR,
  LOGIN_USER,
  AUTH_LOADING,
  CLEAR_AUTH_ERROR,
  SIGN_UP,
  SIGN_UP_ERROR,
  LOGOUT_USER
} from '../actionTypes';

/**
 * @description user sign up
 * @param {object} values
 * @param {function} toggleSignupModal
 * @param {function} toggleVerify
 * @returns {object} action
 */
export async function signUp(values) {
  try {
    const request = await post(`${BASE_URL}/users`, values);
    const { user } = request.data;

    return {
      type: SIGN_UP,
      payload: user
    };
  } catch (error) {
    return {
      type: SIGN_UP_ERROR,
      payload: error.response.data
    };
  }
}


/**
 * @description function for storing platform data in localStorage
 * @param {object} user the user details to be stored in local storage
 * @param {object} localStorage the local storage to be used ( to be mocked for testing )
 * @returns {undefined}
 */
export const storeInLocal = ({
  bio, email, token, username, image
}, localStorage) => {
  localStorage.authorsHavenUsername = username;
  localStorage.authorsHavenEmail = email;
  localStorage.authorsHavenBio = bio;
  localStorage.authorsHavenImage = image;
  localStorage.authorsHavenToken = token;
};

/**
 * @description function for storing platform data in sessionStorage
 * @param {object} user the user details to be stored in session storage
 * @param {object} sessionStorage the session storage to be used ( to be mocked for testing )
 * @returns {undefined}
 */
export const storeInSession = ({
  bio, email, token, username, image
}, sessionStorage) => {
  sessionStorage.authorsHavenUsername = username;
  sessionStorage.authorsHavenEmail = email;
  sessionStorage.authorsHavenBio = bio;
  sessionStorage.authorsHavenImage = image;
  sessionStorage.authorsHavenToken = token;
};

/**
 * @description function for removing platform data in localStorage and sessionStorage
 * @param {object} localStorage the local storage to be used ( to be mocked for testing )
 * @param {object} sessionStorage the session storage to be used ( to be mocked for testing )
 * @returns {undefined}
 */
export const removeFromStorage = (localStorage, sessionStorage) => {
  delete localStorage.authorsHavenUsername;
  delete localStorage.authorsHavenEmail;
  delete localStorage.authorsHavenBio;
  delete localStorage.authorsHavenImage;
  delete localStorage.authorsHavenToken;
  delete sessionStorage.authorsHavenUsername;
  delete sessionStorage.authorsHavenEmail;
  delete sessionStorage.authorsHavenBio;
  delete sessionStorage.authorsHavenImage;
  delete sessionStorage.authorsHavenToken;
};

/**
 * @description function for dispatching action for logging out user
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {object} action
 */
export const logoutUserAction = (dispatch) => {
  removeFromStorage(localStorage, sessionStorage);
  dispatch({
    type: LOGOUT_USER
  });
};

/**
 * @description function for dispatching action for logging in user
 * @returns {object} action
 */
export const loginUserAction = async ({ name, password, rememberMe }) => {
  try {
    const response = await post(`${BASE_URL}/users/login`, { name, password });
    const { user } = response.data;
    if (rememberMe) {
      storeInLocal(user, localStorage);
    } else {
      storeInSession(user, sessionStorage);
    }
    return {
      type: LOGIN_USER,
      payload: user
    };
  } catch (err) {
    return {
      type: LOGIN_ERROR,
      payload: err.response.data
    };
  }
};

/**
 * @description function for dispatching action for social media login
 * @param {object} user
 * @returns {object} action
 */
export const socialLoginUserAction = (user) => {
  storeInSession(user, sessionStorage);
  return { type: LOGIN_USER, payload: user };
};

/**
 * @description function for dispatching loading state action
 * @returns {object} action
 */
export const loadingAuthAction = () => ({ type: AUTH_LOADING });

/**
 * @description function for clearing auth errors
 * @returns {object} action
 */
export const clearAuthErrorAction = () => ({ type: CLEAR_AUTH_ERROR });
