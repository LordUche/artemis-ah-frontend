import React from 'react';
import { shallow } from 'enzyme';
import Notifications from '../../components/Notifications';
import { GET_NOTIFICATIONS } from '../../redux/actionTypes';
import notificationsReducer from '../../redux/reducers/notificationsReducer';

describe('Test the notification component', () => {
  it('it should render a page with the correct content', (done) => {
    const page = shallow(
      <Notifications message="message" title="This is the title" time="mock_time" url="/url-path" />
    );

    expect(page.find('.notifications-div-item-info-name').text()).toBe('This is the title');
    expect(page.find('.notifications-div-item').simulate('click'));

    done();
  });
});

describe('Test the notification component', () => {
  it('it should test the notification reducer', (done) => {
    const initialState = {
      notificationsData: [{ url: 'python-url' }, { url: 'node-url' }, { url: 'java-url' }],
      hasNewNotifications: false,
      notificationNumber: 0
    };
    const payload = { notifications: [2] || { length: 2 } };

    notificationsReducer(initialState, {
      type: GET_NOTIFICATIONS,
      payload
    });
    done();
  });
});
