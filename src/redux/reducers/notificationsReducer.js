import { GET_NOTIFICATIONS } from '../actionTypes';

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
    // for custom endpoint
    case GET_NOTIFICATIONS:
      return {
        ...state,
        hasNewNotifications: payload.notifications.length > 0,
        notificationNumber: payload.notifications.length,
        notificationsData: payload.notifications
      };
    default:
      return state;
  }
};

export default notificationsReducer;
