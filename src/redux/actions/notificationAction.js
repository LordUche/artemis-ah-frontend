import 'babel-polyfill';
import { get } from 'axios';
import BASE_URL from './index';
import { GET_NOTIFICATIONS, READ_NOTIFICATION, NEW_NOTIFICATION } from '../actionTypes';

/**
 * @method getNotificationAction
 * @description - Method to dispatch get notifications
 * @returns {object} - notification action object
 */
const getNotificationAction = async () => {
  const token = localStorage.getItem('authorsHavenToken') || sessionStorage.getItem('authorsHavenToken');

  const request = await get(`${BASE_URL}/users/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const gottenNotification = request.data;
  return {
    type: GET_NOTIFICATIONS,
    payload: gottenNotification
  };
};

/**
 * @description - Method to dispatch read article action updating the application of articles seen
 * @method readNotificationAction
 * @param {string} slugPathUrl
 * @returns {object} action
 */
const readNotificationAction = slugPathUrl => ({
  type: READ_NOTIFICATION,
  payload: { url: slugPathUrl }
});

/**
 * @description - Method to dispatch read article action updating the applocation of read articles
 * @method newNotificationAction
 * @param {object} data
 * @returns {object} action
 */
const newNotificationAction = data => ({
  type: NEW_NOTIFICATION,
  payload: { notifications: [data] }
});

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
  getNotificationAction, readNotificationAction, newNotificationAction, notifyPopup
};
