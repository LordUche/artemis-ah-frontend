import 'babel-polyfill';
import { get } from 'axios';
import BASE_URL from './index';
import { GET_NOTIFICATIONS } from '../actionTypes';

/**
 * @method getNotificationAction
 * @description - Method to dispatch get notifications
 * @param {string} token
 * @param {function} dispatch
 * @returns {object} - notification action object
 */
const getNotificationAction = async (token, dispatch) => {
  try {
    const request = await get(`${BASE_URL}/users/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const gottenNotification = request.data;
    return dispatch({
      type: GET_NOTIFICATIONS,
      payload: gottenNotification
    });
  } catch (err) {
    return { err };
  }
};

/**
 * @description notify function
 * @param {string} title - title of notification
 * @param {string} body - body of notification
 * @return {object} notification data
 */
const notifyPopup = (title = '', body = '') => new Notification(title, {
  icon: 'https://res.cloudinary.com/artemisah/image/upload/v1554389585/authorshaven/favicon.png',
  body
});

export {
  getNotificationAction, notifyPopup
};
