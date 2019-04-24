import { NEW_NOTIFICATION } from '../actionTypes';

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
    case NEW_NOTIFICATION:
      return {
        ...state,
        hasNewNotifications: false,
        notificationNumber: payload.notifications.length,
        notificationsData: [...payload.notifications, ...state.notificationsData]
      };
    default:
      return state;
  }
};

export default notificationsReducer;
