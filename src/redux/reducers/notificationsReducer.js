import { NEW_NOTIFICATION, GET_NOTIFICATIONS, READ_NOTIFICATION } from '../actionTypes';

export const initialState = {
  notificationsData: [],
  hasNewNotifications: false,
  notificationNumber: 0
};

/**
 * @description Notification's Reducer
 * @param {object} state - The initial state
 * @param {object} {*} - destructured type object
 * @returns {object} - The transformed state
 */
const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // for pusher
    case NEW_NOTIFICATION:
      return {
        ...state,
        hasNewNotifications: payload.notifications.length > 0
      };
    // for custom endpoint
    case GET_NOTIFICATIONS:
      return {
        ...state,
        hasNewNotifications: payload.notifications.length > 0,
        notificationNumber: payload.notifications.length,
        notificationsData: [...payload.notifications]
      };
    // for when user reads and article
    case READ_NOTIFICATION:
      return {
        ...state,
        notificationNumber: state.notificationsData.filter(notice => notice.url !== payload.url)
          .length,
        notificationsData: state.notificationsData.filter(notice => notice.url !== payload.url),
        hasNewNotifications:
          state.notificationsData.filter(notice => notice.url !== payload.url).length > 0
      };
    default:
      return state;
  }
};

export default notificationsReducer;
