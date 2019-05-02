import {
  get, post, put, patch, delete as axiosDelete
} from 'axios';
import BASE_URL from './index';
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
  FOLLOW_ACTION_FOLLOWING_IN_PROGRESS,
  FOLLOW_ACTION_UNFOLLOWING_IN_PROGRESS,
  FOLLOW_ACTION_FOLLOWED,
  FOLLOW_ACTION_UNFOLLOWED,
  FOLLOW_ACTION_FOLLOW_FAILED,
  FOLLOW_ACTION_UNFOLLOW_FAILED,
  PROFILE_RESET_EDIT_STATE,
  PROFILE_RESET
} from '../actionTypes';

/**
 * @description function for updating platform data in localStorage and sessionStorage
 * @param {object} storage the storage to be updated ( to be mocked for testing )
 * @param {object} data the new data
 * @returns {undefined}
 */
export const updateStorage = (storage, {
  email, bio, username, image
}) => {
  storage.authorsHavenUsername = username;
  storage.authorsHavenEmail = email;
  storage.authorsHavenBio = bio;
  storage.authorsHavenImage = image;
};

/**
 * @param {string} username Username of the user.
 * @param {string} token Authorization token.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to fetch
 */
export const fetchUserDetails = (username, token, dispatch) => get(`profiles/${username}`, {
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${token}`
  }
})
  .then(response => response.data)
  .then((data) => {
    dispatch({
      type: PROFILE_USER_DETAILS_FETCHED,
      data
    });
  })
  .catch(() => {
    dispatch({ type: PROFILE_USER_DETAILS_FETCH_ERROR });
  });

/**
 * @param {string} username Username of the user.
 * @param {function} dispatch Function to dispatch actions to redux store.
 * @param {number} pageToDisplay The page to display while paginating.
 * @returns {Promise} A promise to fetch.
 */
export const fetchUserArticles = (username, dispatch, pageToDisplay = 1) => {
  dispatch({ type: PROFILE_ARTICLES_FETCHING });

  return get('articles', {
    baseURL: BASE_URL,
    params: {
      author: username,
      page: pageToDisplay
    }
  })
    .then(response => response.data)
    .then((data) => {
      dispatch({
        type: PROFILE_ARTICLES_FETCHED,
        data
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
    baseURL: BASE_URL
  })
    .then(response => response.data)
    .then((data) => {
      dispatch({
        type: PROFILE_FOLLOWERS_FETCHED,
        data
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
    baseURL: BASE_URL
  })
    .then(response => response.data)
    .then((data) => {
      dispatch({
        type: PROFILE_FOLLOWING_FETCHED,
        data
      });
    })
    .catch(() => {
      dispatch({ type: PROFILE_FOLLOWING_FETCH_ERROR });
    });
};

/**
 * @param {string} authToken The logged in user's JWT authentication token.
 * @param {string} username The username of the user to follow.
 * @param {function} dispatch A reference to the dispatch function.
 * @returns {Promise} Returns a promise to follow/unfollow the user.
 */
export const followUser = (authToken, username, dispatch) => {
  dispatch({ type: FOLLOW_ACTION_FOLLOWING_IN_PROGRESS });

  return post(`profiles/${username}/follow`, null, {
    baseURL: BASE_URL,
    headers: {
      authorization: `Bearer ${authToken}`
    }
  })
    .then(response => response.data)
    .then(() => {
      dispatch({ type: FOLLOW_ACTION_FOLLOWED });
    })
    .catch(() => {
      dispatch({ type: FOLLOW_ACTION_FOLLOW_FAILED });
    });
};

/**
 * @param {*} authToken The logged in user's JWT authentication token.
 * @param {*} username The username of the user to unfollow.
 * @param {*} dispatch A reference to the dispatch function.
 * @returns {Promise} Returns a promise to unfollow the user.
 */
export const unfollowUser = (authToken, username, dispatch) => {
  dispatch({ type: FOLLOW_ACTION_UNFOLLOWING_IN_PROGRESS });

  return axiosDelete(`profiles/${username}/follow`, {
    baseURL: BASE_URL,
    headers: {
      authorization: `Bearer ${authToken}`
    }
  })
    .then(response => response.data)
    .then(() => {
      dispatch({ type: FOLLOW_ACTION_UNFOLLOWED });
    })
    .catch(() => {
      dispatch({ type: FOLLOW_ACTION_UNFOLLOW_FAILED });
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

  return post('https://api.cloudinary.com/v1_1/artemisah/image/upload', formData);
};

/**
 * @param {*} token The user's authorization token
 * @param {*} updatedBio The updated bio of the user
 * @param {*} newUsername The updated username of the user
 * @param {*} uploadedImageUrl The cloudinary image url of the uploaded image.
 * @param {*} dispatch Function to dispatch actions to redux store.
 * @returns {undefined}
 */
export const saveUserDetails = (token, updatedBio, newUsername, uploadedImageUrl, dispatch) => {
  const postData = {
    bio: updatedBio,
    username: newUsername
  };
  if (uploadedImageUrl) {
    postData.image = uploadedImageUrl;
  }

  put('user', postData, {
    baseURL: BASE_URL,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(response => response.data.user)
    .then((data) => {
      const storage = localStorage.authorsHavenToken ? localStorage : sessionStorage;
      updateStorage(storage, data);
      dispatch({
        type: PROFILE_DETAILS_UPDATED,
        data
      });
    })
    .catch((err) => {
      const data = err.response ? err.response.data.message : 'Could not update profile right now, please try again later';
      dispatch({ type: PROFILE_DETAILS_UPDATE_ERROR, data });
    });
};

/**
 * @param {*} token The user's authorization token
 * @param {*} updatedBio The updated bio of the user
 * @param {*} newUsername The updated username of the user
 * @param {File} selectedImage The image the user selected on their browser.
 * @param {*} dispatch Function to dispatch actions to redux store.
 * @returns {Promise} A promise to update the user's profile.
 */
export const updateUserDetails = (token, updatedBio, newUsername, selectedImage, dispatch) => {
  dispatch({ type: PROFILE_DETAILS_UPDATING });

  if (selectedImage) {
    uploadImage(selectedImage)
      .then(response => response.data.secure_url)
      .then((secureUrl) => {
        saveUserDetails(token, updatedBio, newUsername, secureUrl, dispatch);
      })
      .catch(() => {
        dispatch({ type: PROFILE_DETAILS_UPDATE_ERROR });
      });
  } else {
    saveUserDetails(token, updatedBio, newUsername, null, dispatch);
  }
};

/**
 * @description Resets `editState`
 * @returns {object} Action object for redux.
 */
export const resetEditState = () => ({
  type: PROFILE_RESET_EDIT_STATE
});

/**
 * @description Reset user profile.
 * @returns {object} Action object for redux
 */
export const resetProfile = () => ({
  type: PROFILE_RESET
});

/**
 * @param {*} token The user's authorization token
 * @param {*} details The user's new notification settings
 * @param {*} dispatch Function to dispatch actions to redux store.
 * @returns {undefined}
 */
export const updateUserNotificationDetails = async (token, details, dispatch) => {
  dispatch({ type: PROFILE_DETAILS_UPDATING });
  const { inAppNotification, emailNotification } = details;
  const newNotificationDetails = { inAppNotification, emailNotification };
  try {
    const response = await patch(`${BASE_URL}/users/notification`, newNotificationDetails, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { message } = response.data;
    dispatch({ type: PROFILE_DETAILS_UPDATED, data: { message } });
  } catch (err) {
    dispatch({ type: PROFILE_DETAILS_UPDATE_ERROR });
  }
};
