import { get, post, put } from 'axios';
import { BASE_URL } from './index';
import {
  PROFILE_USER_DETAILS_FETCHED,
  PROFILE_USER_DETAILS_FETCH_ERROR,
  PROFILE_ARTICLES_FETCHING,
  PROFILE_ARTICLES_FETCHED,
  PROFILE_ARTICLES_FETCH_ERROR,
  PROFILE_FOLLOWERS_FETCHING,
  PROFILE_FOLLOWERS_FETCHED,
  PROFILE_FOLLOWERS_FETCH_ERROR,
  PROFILE_FOLLOWING_FETCHING,
  PROFILE_FOLLOWING_FETCHED,
  PROFILE_FOLLOWING_FETCH_ERROR,
  PROFILE_DETAILS_UPDATED,
  PROFILE_DETAILS_UPDATE_ERROR,
  PROFILE_DETAILS_UPDATING,
  PROFILE_RESET_EDIT_STATE,
} from '../actionTypes';

/**
 * @param {string} username Username of the user.
 * @param {string} token Authorization token.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserDetails = (username, token, dispatch) => get(`profiles/${username}`, {
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${token}`,
  }
})
  .then(response => response.data)
  .then((data) => {
    dispatch({
      type: PROFILE_USER_DETAILS_FETCHED,
      data,
    });
  })
  .catch(() => {
    dispatch({ type: PROFILE_USER_DETAILS_FETCH_ERROR });
  });

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch.
 */
export const fetchUserArticles = (username, dispatch) => {
  dispatch({ type: PROFILE_ARTICLES_FETCHING });

  return get('articles', {
    baseURL: BASE_URL,
    params: {
      author: username,
    },
  })
    .then(response => response.data)
    .then((data) => {
      dispatch({
        type: PROFILE_ARTICLES_FETCHED,
        data,
      });
    })
    .catch(() => {
      dispatch({ type: PROFILE_ARTICLES_FETCH_ERROR });
    });
};

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserFollowers = (username, dispatch) => {
  dispatch({ type: PROFILE_FOLLOWERS_FETCHING });

  return get(`profiles/${username}/followers`, {
    baseURL: BASE_URL,
  })
    .then(response => response.data)
    .then((data) => {
      dispatch({
        type: PROFILE_FOLLOWERS_FETCHED,
        data,
      });
    })
    .catch(() => {
      dispatch({ type: PROFILE_FOLLOWERS_FETCH_ERROR });
    });
};

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserFollowing = (username, dispatch) => {
  dispatch({ type: PROFILE_FOLLOWING_FETCHING });

  return get(`profiles/${username}/following`, {
    baseURL: BASE_URL,
  })
    .then(response => response.data)
    .then((data) => {
      dispatch({
        type: PROFILE_FOLLOWING_FETCHED,
        data,
      });
    })
    .catch(() => {
      dispatch({ type: PROFILE_FOLLOWING_FETCH_ERROR });
    });
};

/**
 * @description Uploads the user image to cloudinary.
 * @param {File} file The selected image.
 * @returns {Promise} Returns a promise to upload the image.
 */
const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'vslx4tc8');

  return post(
    'https://api.cloudinary.com/v1_1/artemisah/image/upload',
    formData
  );
};

/**
 * @param {*} token The user's authorization token
 * @param {*} updatedBio The updated bio of the user
 * @param {*} uploadedImageUrl The cloudinary image url of the uploaded image.
 * @param {*} dispatch Function to dispatch actions to redux store.
 * @returns {undefined}
 */
const saveUserDetails = (token, updatedBio, uploadedImageUrl, dispatch) => {
  const postData = {
    bio: updatedBio,
  };
  if (uploadedImageUrl) {
    postData.image = uploadedImageUrl;
  }

  put('user', postData, {
    baseURL: BASE_URL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.data.user)
    .then((data) => {
      dispatch({
        type: PROFILE_DETAILS_UPDATED,
        data,
      });
    })
    .catch(() => {
      dispatch({ type: PROFILE_DETAILS_UPDATE_ERROR });
    });
};

/**
 * @param {*} token The user's authorization token
 * @param {*} updatedBio The updated bio of the user
 * @param {File} selectedImage The image the user selected on their browser.
 * @param {*} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to update the user's profile.
 */
export const updateUserDetails = (token, updatedBio, selectedImage, dispatch) => {
  dispatch({ type: PROFILE_DETAILS_UPDATING });

  if (selectedImage) {
    uploadImage(selectedImage)
      .then(response => response.data.secure_url)
      .then((secureUrl) => {
        saveUserDetails(token, updatedBio, secureUrl, dispatch);
      })
      .catch(() => {
        dispatch({ type: PROFILE_DETAILS_UPDATE_ERROR });
      });
  } else {
    saveUserDetails(token, updatedBio, null, dispatch);
  }
};

/**
 * Resets `editState`
 * @returns {object} Action object for redux.
 */
export const resetEditState = () => ({
  type: PROFILE_RESET_EDIT_STATE,
});
