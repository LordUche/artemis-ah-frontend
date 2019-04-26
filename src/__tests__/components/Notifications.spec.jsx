import React from 'react';
import { shallow } from 'enzyme';
import Notifications from '../../components/Notifications';
import {
  readNotificationAction,
  newNotificationAction
} from '../../redux/actions/notificationAction';
import { NEW_NOTIFICATION, GET_NOTIFICATIONS, READ_NOTIFICATION } from '../../redux/actionTypes';
import notificationsReducer from '../../redux/reducers/notificationsReducer';

describe('Test the notification component', () => {
  it('it should render a page with the correct content', (done) => {
    const page = shallow(
      <Notifications message="message" title="This is the title" type="comment" url="/url-path" />
    );

    expect(page.find('.notifications-div-item-info-name').text()).toBe('This is the title');
    expect(page.find('.notifications-div-item').simulate('click'));

    done();
  });
});

describe('Test the notification component', () => {
  it('it should return the correct object', () => {
    expect(readNotificationAction('slug-path')).toEqual({
      type: 'READ_NOTIFICATION',
      payload: { url: 'slug-path' }
    });
  });

  it('it should return the correct object', () => {
    newNotificationAction('data', jest.fn());
  });

  it('it should test the notification reducer', () => {
    const initialState = {
      notificationsData: [{ url: 'python-url' }, { url: 'node-url' }, { url: 'java-url' }],
      hasNewNotifications: false,
      notificationNumber: 0
    };
    const payload = { notifications: [2] || { length: 2 } };

    notificationsReducer(initialState, { type: NEW_NOTIFICATION, payload });
    notificationsReducer(initialState, {
      type: GET_NOTIFICATIONS,
      payload
    });
    notificationsReducer(initialState, { type: READ_NOTIFICATION, payload: { url: 'java-url' } });
  });
});
